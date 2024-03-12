# MukayeseLLM Leaderboard

This leaderboard is designed to evaluate the performance of causal large language models (LLMs) on several Turkish language tasks.

## 📊 Leaderboard

| Model | Type | Size (B) | trnews-64 (bpc ⏬) |
|:----- |:----:| -------: | :----------------: |
| [asafaya/kanarya-2b](https://huggingface.co/asafaya/kanarya-2b)  | base             | 2.06        | 0.728 |
| [asafaya/kanarya-750m](https://huggingface.co/asafaya/kanarya-750m) | base             | 0.74        | 0.791 |
| [ytu-ce-cosmos/turkish-gpt2-large](https://huggingface.co/ytu-ce-cosmos/turkish-gpt2-large) | base             | 0.77        | 0.805 |
| [Trendyol/Trendyol-LLM-7b-chat-v0.1](https://huggingface.co/Trendyol/Trendyol-LLM-7b-chat-v0.1) | finetuned-chat   | 6.84        | 0.820 |
| [Trendyol/Trendyol-LLM-7b-base-v0.1](https://huggingface.co/Trendyol/Trendyol-LLM-7b-base-v0.1) | finetuned-base   | 6.84        | 0.829 |
| [facebook/xglm-7.5B](https://huggingface.co/facebook/xglm-7.5B) | base             | 7.49        | 0.880 |
| [facebook/xglm-4.5B](https://huggingface.co/facebook/xglm-4.5B) | base             | 4.55        | 0.949 |
| [google/gemma-7b](https://huggingface.co/google/gemma-7b)     | base             | 8.54        | 0.989 |
| [Metin/gemma-2b-tr](https://huggingface.co/Metin/gemma-2b-tr)   | lora-tuned-base | 2.51        | 1.089 |
| [mistralai/Mixtral-8x7B-v0.1](https://huggingface.co/mistralai/Mixtral-8x7B-v0.1) | base             | 46.70       | 1.096 |
| [google/gemma-2b](https://huggingface.co/google/gemma-2b)     | base             | 2.51        | 1.208 |
| [mistralai/Mistral-7B-v0.1](https://huggingface.co/mistralai/Mistral-7B-v0.1) | base             | 7.24        | 1.260 |
| [ai-forever/mGPT](https://huggingface.co/ai-forever/mGPT) | base             | 1.42        | 1.306 |
| [meta-llama/Llama-2-7b-hf](https://huggingface.co/meta-llama/Llama-2-7b-hf) | base             | 6.74        | 1.374 |
| [allenai/OLMo-7B](https://huggingface.co/allenai/OLMo-7B)     | base             | 6.89        | 1.389 |
| [mistralai/Mistral-7B-Instruct-v0.1](https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.1) | instruct         | 7.24        | 1.662 |
| [meta-llama/Llama-2-7b-chat-hf](https://huggingface.co/meta-llama/Llama-2-7b-chat-hf) | instruct         | 6.74        | 1.709 |

<br>
<br>

## 📚 MukayeseLLM Tasks 📚 

### 1. Language Modeling on trnews-64

Auto-regressive language modeling focuses on modeling the probability `P(X)` of a text sequence of `n` tokens, where `X = (x_1, x_2, ..., x_n)`, and `P(X) = \prod_{i=1}^{n}P(x_i|x_{<i})`. The objective is to estimate the probability of a given text sequence.

__trnews-64__ is a language modeling benchmark that contains 64 million words of news columns and articles retrieved from the TS Timeline Corpus [^2^]. This corpus consists of a mix of news articles collected from different journals about various domains and topics. Since trnews-64 is intended for evaluating bpc language model on the character level, articles were lightly pre-processed, and no further tokenization was applied.

Evaluation scripts for trnews-64 are available for pytorch [here](/data/src/evaluate_bpc_pytorch.py), and for flax [here](/data/src/evaluate_bpc_flax.py).

[^2^]: Taner Sezer. 2017. Ts corpus project: An online turkish dictionary and ts diy corpus. European Journal of Language and Literature, 9(1):18–24.

**Bits-Per-Char (bpc)**

Language models are trained on minimizing the negative log-likelihood (NLL) of the training set, and their performance is measured based on how well they can generalize on the test set:

<br>
<img src="https://latex.codecogs.com/svg.latex?nll(X_{test}) = -\frac{1}{n} \sum_{i=1}^{n}log\ p_\theta(x_i|x_{test}{<i})" style="border:none;" height="80" />
<br>

where `X_{test}` is the test set, `n` is the number of tokens in `X_{test}`, and `p_\theta(x_i|x_{test}{<i})` is the probability of the `i`-th token given the previous tokens.

Due to the fact that NLL is averaged over the number of tokens, it is not a good measure to compare models with different tokenization algorithms. To address this issue, bits-per-character (BPC) is used as a more robust metric. BPC is calculated as follows:

<br>
<img src="https://latex.codecogs.com/svg.latex?bpc(X_{test}) = \frac{n}{Nlog(2)}nll(X_{test}) = \frac{-1}{Nlog(2)} \sum_{i=1}^{n}log\ p_\theta(x_i|x_{test}{<i})" style="border:none;" height="80" />
<br>

where `N` is the original number of characters in `X_{test}`, and `n` is the number of tokens of `X_{test}` when tokenized using the model's tokenization algorithm. Depending on what tokenization is used, `N` might or might not be equal to `n`. To accommodate this issue, `N` should always be the same when calculating bpc for different models [^shoeybi-etal-2019-megatronlm^].

[^shoeybi-etal-2019-megatronlm^]: Mohammad Shoeybi, Mostofa Patwary, Raul Puri, Patrick LeGresley, Jared Casper, and Bryan Catanzaro. 2019. Megatron-lm: Training multi-billion parameter language models using model parallelism. Computing Research Repository, arXiv:1909.08053. Version 4.
