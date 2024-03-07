#!/usr/bin/env python
# coding: utf-8

"""
Calculate bits per character using a causal language modeling on the test split of trnews-64 benchmark.
Usage: python bpc.py --model asafaya/kanarya-750m --batch_size 1

version: 1.0
contact: Ali Safaya (alisafaya at gmail dot com)
"""

import re
import os
import math
import torch
import requests

from tqdm import tqdm
from transformers import AutoTokenizer, AutoModelForCausalLM
from torch.nn.functional import cross_entropy


torch.manual_seed(0)
log2 = 0.6931471805599453
DEFAULT_PAD_TOKEN_ID = 0

IGNORE_INDEX = (
    -100
)  # ignore_index is used to mask loss of padding tokens in cross_entropy

max_article_length = 4000  # This should not be changed.
# Otherwise, the results will be not be comparable with the results in the leaderboard.
# longer articles are filtered out to avoid different truncations in different tokenizers
# i.e. some tokenizer require more tokens to encode the same text.
# this way we ensure consistent inputs for different models


def load_model(model):
    llm = AutoModelForCausalLM.from_pretrained(
        model, torch_dtype=torch.bfloat16, trust_remote_code=True, device_map="auto"
    )
    llm.eval()
    return llm


def get_vocab_size(model):
    if hasattr(model.config, "vocab_size"):
        vocab_size = model.config.vocab_size
        return vocab_size
    elif hasattr(model.config, "n_vocab"):
        vocab_size = model.config.n_vocab
        return vocab_size
    else:
        raise ValueError(f"Cannot determine vocab_size from {type(model)}")


def get_context_size(model):
    if hasattr(model.config, "n_ctx"):
        context_size = model.config.n_ctx
        return context_size
    elif hasattr(model.config, "n_positions"):
        context_size = model.config.n_positions
        return context_size
    elif hasattr(model.config, "max_position_embeddings"):
        context_size = model.config.max_position_embeddings
        return context_size
    else:
        raise ValueError(
            f"Cannot determine context_size from {type(model)}. Please provide one using --context_size."
        )


def load_trnews():
    if not os.path.exists("trnews-64.test.raw"):
        try:
            print("Downloading trnews-64.test.raw...")
            url = "https://github.com/tdd-ai/trnews-64/releases/download/v1.0/trnews-64.test.raw.gz"
            r = requests.get(url, allow_redirects=True)
            open("trnews-64.test.raw.gz", "wb").write(r.content)
            os.system("gunzip trnews-64.test.raw.gz")
        except Exception as e:
            raise Exception(f"Cannot download trnews-64.test.raw. {e}")

    try:
        with open("trnews-64.test.raw") as fi:
            articles = re.split("\n\n", fi.read())
            articles = [a for a in articles if len(a) < max_article_length]
    except FileNotFoundError:
        raise FileNotFoundError(
            f"Cannot open trnews-64.test.raw. Make sure it exists in the current directory."
        )

    return articles


def load_wikitext():
    if not os.path.exists("wikitext-2.test.raw"):
        try:
            print("Downloading wikitext-2.test.raw...")
            url = "https://github.com/tdd-ai/trnews-64/releases/download/v1.0/wikitext-2.test.raw.gz"
            r = requests.get(url, allow_redirects=True)
            open("wikitext-2.test.raw.gz", "wb").write(r.content)
            os.system("gunzip wikitext-2.test.raw.gz")
        except Exception as e:
            raise Exception(f"Cannot download wikitext-2.test.raw. {e}")

    try:
        with open("wikitext-2.test.raw") as fi:
            articles = re.split("\n\n", fi.read())
            articles = [a for a in articles if len(a) < max_article_length]
    except FileNotFoundError:
        raise FileNotFoundError(
            f"Cannot open wikitext-2.test.raw. Make sure it exists in the current directory."
        )

    return articles


def pad_inputs_and_targets(tokenized, pad_token_id, ignore_index):

    input_ids = [t[:-1] for t in tokenized]
    input_ids = torch.nn.utils.rnn.pad_sequence(
        input_ids, batch_first=True, padding_value=pad_token_id
    )

    labels = [t[1:] for t in tokenized]
    labels = torch.nn.utils.rnn.pad_sequence(
        labels, batch_first=True, padding_value=ignore_index
    )

    return input_ids, labels


def batch(tokens, pad_token_id, batch_size):
    # sort by length to minimize padding
    tokens.sort(key=len, reverse=True)
    batches = []
    for i in range(0, len(tokens), batch_size):
        batch = tokens[i : i + batch_size]
        inputs, targets = pad_inputs_and_targets(
            batch, pad_token_id, ignore_index=IGNORE_INDEX
        )
        batches.append((inputs, targets))
    return batches


def tokenize(model_id, articles, batch_size=1, bos_id=None, context_size=None):
    tokenizer = AutoTokenizer.from_pretrained(model_id, use_fast=False)

    # check for eos, bos, pad tokens
    if tokenizer.bos_token_id is None and bos_id is None:
        raise ValueError(
            f"{model_id} does not have a bos token. Please provide one using --bos_id."
        )
    elif tokenizer.bos_token_id is None:
        tokenizer.bos_token_id = bos_id

    if tokenizer.pad_token_id is None:
        if tokenizer.unk_token_id is not None:
            tokenizer.pad_token_id = tokenizer.unk_token_id
        else:
            tokenizer.pad_token_id = DEFAULT_PAD_TOKEN_ID

    tokenized, nchars = [], 0

    for article in tqdm(articles, desc="Tokenizing", unit="line"):
        # we always add bos token to predict the first token
        tokens = tokenizer.encode(article, add_special_tokens=False)
        tokens = [tokenizer.bos_token_id] + tokens

        if context_size is not None and len(tokens) > context_size:
            # split into chunks of equal size. last chunk may be smaller than the rest
            chunk_size = math.ceil(len(tokens) / math.ceil(len(tokens) / context_size))
            chunks = [
                torch.tensor(tokens[i : i + chunk_size + 1])
                for i in range(0, len(tokens), chunk_size)
            ]  # +1 for shifting
            tokenized.extend(chunks)
        else:
            tokenized.append(torch.tensor(tokens))

        nchars += len(article)

    assert nchars in (
        6939922,
        1205161,
    ), f"Expected 6939922 or 1205161 chars, got {nchars} chars."

    batched = batch(tokenized, tokenizer.pad_token_id, batch_size)
    return batched, tokenized, nchars


def nll(llm, batches):
    sum = cnt = 0
    for x, y in tqdm(batches, desc="Calculating NLL", unit="batch"):
        with torch.no_grad():
            logits = llm(x.to(llm.device)).logits  # [B,T,V]

            # check for nans in logits
            if torch.isnan(logits).any():
                raise ValueError("NaNs in logits")

            logits = logits.view(-1, logits.size(-1)).float()  # [B*T,V]
            targets = y.view(-1).to(llm.device)  # [B*T]
            sum += cross_entropy(
                logits, targets, reduction="sum", ignore_index=IGNORE_INDEX
            )
            cnt += (targets != IGNORE_INDEX).sum().item()

    return (sum, cnt)


def get_nparams(llm):
    return f"{sum(p.numel() for p in llm.parameters() if p.requires_grad) / 1e9}B"


def main(args):

    model = args.model
    batch_size = args.batch_size

    print(f"Loading {model}...")
    llm = load_model(model)
    vocab_size = get_vocab_size(llm)

    if args.context_size is not None:
        context_size = args.context_size
    else:
        context_size = get_context_size(llm)

    print(f"{type(llm)} with vocab_size={vocab_size}")

    if args.wikitext:
        print(f"Loading wikitext-2.test.raw...")
        articles = load_wikitext()
        print(f"Read {len(articles)} articles from wikitext-2.test.raw")
    else:
        print(f"Loading trnews-64.test.raw...")
        articles = load_trnews()
        print(f"Read {len(articles)} articles from trnews-64.test.raw")

    print(f"Tokenizing trnews-64...")
    batches, tokens, nchars = tokenize(
        model, articles, batch_size=batch_size, context_size=context_size
    )
    ntokens = sum(len(t) for t in tokens) - len(tokens)  # -len(tokens) for bos tokens

    print(f"Got {ntokens} tokens from {nchars} chars")
    print(f"tokenizer encodes {nchars/ntokens} chars per token.")
    print(f"Got {len(batches)} batches with batch_size={batch_size}")

    (sum_nll, ntokens_predicted) = nll(llm, batches)

    assert (
        ntokens_predicted == ntokens
    ), f"Expected {ntokens} tokens, predicted {ntokens_predicted} tokens."

    sum_bits = sum_nll / log2
    bits_per_char = sum_bits / nchars
    token_ppl = torch.exp(sum_nll / ntokens_predicted)

    print(
        f"""Summary:
model\t= {model}
ntokens\t= {ntokens_predicted}
nchars\t= {nchars}
nparams\t= {get_nparams(llm)}
nvocabs\t= {vocab_size}
sum_nll\t= {sum_nll}
tkn_ppl\t= {token_ppl}
bpc\t= {bits_per_char}"""
    )


if __name__ == "__main__":
    from argparse import ArgumentParser

    parser = ArgumentParser(description="Causal LM evaluation")
    parser.add_argument(
        "-m",
        "--model",
        default="asafaya/kanarya-750m",
        type=str,
        help="huggingface model id or path to model directory",
    )
    parser.add_argument("-b", "--batch_size", default=1, type=int, help="Batch size")
    parser.add_argument(
        "-c", "--context_size", default=None, type=int, help="Context size"
    )
    parser.add_argument("--bos_id", default=None, type=int, help="BOS token id.")
    parser.add_argument(
        "--wikitext",
        action="store_true",
        help="Use wikitext-2.test.raw instead of trnews-64.test.raw",
    )
    args = parser.parse_args()
    main(args)
