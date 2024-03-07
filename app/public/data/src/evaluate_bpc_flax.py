#!/usr/bin/env python
# coding: utf-8

"""
Calculate bits per character using a causal language modeling on the test split of trnews-64 benchmark.
Usage: python evaluate_trnews_bpc.py --model asafaya/kanarya-750m --batch_size 1

version: 1.0
contact: Ali Safaya (alisafaya at gmail dot com)
"""

import re
import os
import math
import requests

import optax
import jax.numpy as jnp

from tqdm import tqdm
from transformers import AutoTokenizer, FlaxAutoModelForCausalLM
from flax import traverse_util


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
    llm = FlaxAutoModelForCausalLM.from_pretrained(model, dtype=jnp.bfloat16)

    # convert weights to bfloat16
    flat_params = traverse_util.flatten_dict(llm.params)
    mask = {path: not (path[-2][:2] == "ln" and path[-1] in ("bias", "scale"))
        for path in flat_params}
    mask = traverse_util.unflatten_dict(mask)
    llm.params = llm.to_bf16(llm.params, mask)
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


def pad_inputs_and_targets(tokenized, pad_token_id, ignore_index, max_length):
    input_ids = [t[:-1] for t in tokenized]
    labels = [t[1:] for t in tokenized]

    # pad inputs and targets
    for i in range(len(input_ids)):
        input_ids[i] = input_ids[i] + [pad_token_id] * (max_length - len(input_ids[i]))
        labels[i] = labels[i] + [ignore_index] * (max_length - len(labels[i]))

    return jnp.array(input_ids), jnp.array(labels)


def batch(tokens, pad_token_id, batch_size):
    # sort by length to minimize padding
    tokens.sort(key=len, reverse=True)
    max_length = len(tokens[0])
    batches = []
    for i in range(0, len(tokens), batch_size):
        batch = tokens[i : i + batch_size]
        inputs, targets = pad_inputs_and_targets(
            batch, pad_token_id, IGNORE_INDEX, max_length
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
                tokens[i : i + chunk_size + 1]
                for i in range(0, len(tokens), chunk_size)
            ]  # +1 for shifting
            tokenized.extend(chunks)
        else:
            tokenized.append(tokens)

        nchars += len(article)

    assert (
        nchars in (6939922, 1205161)
    ), f"Expected 6939922 or 1205161 chars, got {nchars} chars."

    batched = batch(tokenized, tokenizer.pad_token_id, batch_size)
    return batched, tokenized, nchars


def loss_fn(llm, inputs, targets):
    logits = llm(inputs).logits  # [B,T,V]
    logits = logits.reshape(-1, logits.shape[-1])  # [B*T,V]
    targets = targets.reshape(-1)  # [B*T]
    loss = optax.softmax_cross_entropy_with_integer_labels(logits, targets)
    # mask padding tokens
    mask = targets != IGNORE_INDEX
    loss = loss * mask
    return loss.sum(), mask.sum()


def nll(llm, batches):

    total_nll = 0.0
    token_cnt = 0
    for x, y in tqdm(batches, desc="Calculating NLL", unit="batch"):
        loss, mask = loss_fn(llm, x, y)
        total_nll += loss.item()
        token_cnt += mask.item()

    return (total_nll, token_cnt)


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

    print(f"Tokenizing...")
    batches, tokens, nchars = tokenize(
        model, articles, batch_size, args.bos_id, context_size
    )
    ntokens = sum(len(t) for t in tokens) - len(tokens)  # -len(tokens) for bos tokens

    print(f"Got {ntokens} tokens from {nchars} chars")
    print(f"Got {len(batches)} batches with batch_size={batch_size}")
    print(f"tokenizer encodes {nchars/ntokens} chars per token.")

    (sum_nll, ntokens_predicted) = nll(llm, batches)

    assert (
        int(ntokens_predicted) == ntokens
    ), f"Expected {ntokens} tokens, predicted {ntokens_predicted} tokens."

    sum_bits = sum_nll / log2
    bits_per_char = (sum_bits / nchars)
    token_ppl = math.exp(sum_nll / ntokens_predicted)

    print(
        f"""Summary:
model\t= {model}
ntokens\t= {ntokens_predicted}
nchars\t= {nchars}
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
