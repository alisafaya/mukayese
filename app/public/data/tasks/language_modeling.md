# 📖 Language Modeling

This leaderboard presents the results and baseline models for the Language Modeling benchmark in the Mukayese Turkish NLP benchmark suite.

Auto-regressive language modeling focuses on modeling the probability $P(X)$ of a text sequence of $n$ tokens, where $X = (x_1, x_2, ..., x_n)$, and $P(X) = \prod_{i=1}^{n}P(x_i|x_{<i})$. The objective is to estimate the probability of a given text sequence.

We introduce two benchmarking corpora for auto-regressive language modeling, namely __trnews-64__ and __trwiki-67__, along with their `train/valid/test` splits.

## 📊 Leaderboard

Results of language modeling models, with their no of parameters. Perplexity (PPL) is reported for __trwiki-67__, and Bits-per-char (BPC) for trnews-
64, on their test sets

| Baseline | Verified | Model | trwiki-67 (PPL ⏬) | trnews-64 (BPC ⏬) |
| -------- | -------- |:--- |:---:| :---: |
| ✅ | ✅ | [SHA-RNN](https://github.com/alisafaya/mukayese/tree/v0.0.1/language-modeling/sharnn) (87M/53M) | 12.54 | 0.938 |
| ✅ | ✅ | [Adap. Transformer](https://github.com/alisafaya/mukayese/tree/v0.0.1/language-modeling/adaptive) (92M/38M) |  14.64 | 1.024 |

## 🔶 Datasets

|             | # articles | # words | # tokens | avg.sent |
|-------------|-----------|--------|---------|----------|
| __trwiki-67__ |||||
| Training    | 374K      | 63.5M  | 139M    | 12.8     |
| Validation  | 10K       | 1.7M   | 4M      | 13.3     |
| Test        | 10K       | 1.7M   | 4M      | 12.9     |
| Total       | 394K      | 67M    | 147M    | 12.8     |
| __trnews-64__ |||||
| Training    | 140K      | 59.7M  | 421M    | 23       |
| Validation  | 5K        | 2.1M   | 15M     | 22.8     |
| Test        | 5K        | 2.1M   | 15M     | 22.9     |
| Total       | 150K      | 64M    | 450M    | 23       |

Statistics about __trwiki-67__ and __trnews-64__ corpus splits. The column __avg. sents__ refers to the average number of sentences per article. Tokens are characters for __trnews-64__ and sentencepiece tokens for __trwiki-67__.

### :small_orange_diamond: trwiki-67

__trwiki-67__ is a language modeling corpus that contains 67 million words of raw Turkish Wikipedia articles. We extracted this corpus from a recent Turkish Wikipedia dump[^1^] using WikiExtractor [^attardi-2015-wikiextractor^]. Additionally, further pre-processing was applied to get rid of the redundant text. Only the articles' raw text and titles were kept and presented in their cased format (with no upper/lower case transformations).

Due to the agglutinative nature of the Turkish language, most of the words are derived by combining one or more suffixes with one of the roots [^oflazer-saraclar-2018-turkishnlp^]. To make use of this attribute of the Turkish language, we train a sentencepiece unigram model [^kudo-2018-subword^] with a vocabulary size of 32K, only using the training split of the corpus. Although we advise using the tokenized version of this corpus to encourage reproducibility, we provide a raw version of this corpus that can be utilized as a benchmark for language modeling tasks on a character, subword, or word level.

[^1^]: [https://dumps.wikimedia.org/trwiki/20210720/](https://dumps.wikimedia.org/trwiki/20210720/) (accessed on 20 July 2021).
[^attardi-2015-wikiextractor^]: Giusepppe Attardi. 2015. Wikiextractor. https:// github.com/attardi/wikiextractor
[^oflazer-saraclar-2018-turkishnlp^]: Kemal Oflazer and Murat Saraçlar, editors. 2018. Turkish Natural Language Processing. Springer International Publishing.
[^kudo-2018-subword^]: Taku Kudo. 2018. Subword regularization: Improving neural network translation models with multiple subword candidates. In Proceedings of the 56th Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers), pages 66–75, Melbourne, Australia. Association for Computational Linguistics.

### :small_orange_diamond: trnews-64

__trnews-64__ is another language modeling corpus that contains 64 million words of news columns and articles retrieved from the TS Timeline Corpus [^2^]. It can be utilized as a benchmark for modeling long-range dependencies in the Turkish language, as it contains relatively long documents. This corpus consists of a mix of news articles collected from different journals about various domains and topics. Since trnews-64 is intended for language modeling on the character level, articles were lightly pre-processed, and no further tokenization was applied.

These corpora are presented with minimal pre-processing. We remove non-Turkish characters and redundant texts such as category lists and tables from __trwiki-67__. Sentences and words are counted based on `sent_tokenize` and `word_tokenize` methods of NLTK [^3^].

[^2^]: Taner Sezer. 2017. Ts corpus project: An online turkish dictionary and ts diy corpus. European Journal of Language and Literature, 9(1):18–24.
[^3^]: Steven Bird, Ewan Klein, and Edward Loper. 2009. Natural Language Processing with Python, 1st edition. O’Reilly Media, Inc.

## 📏 Metrics

**Perplexity and Bit-Per-Char**

Language models are trained on minimizing the negative log-likelihood (`Nll`) of the training set, and their performance is measured based on how well they can generalize on the test set:

$Nll(X_{test}) = -\frac{1}{n} \sum_{i=1}^{n}log\ p_\theta(x_i|x_{test}{<i})$

Word or sub-word level language models are evaluated using the word perplexity (PPL) metric, a derivative of NLL. On the other hand, character language models are evaluated using entropy-based Bits-per-character (BPC) metric, which is also another derivative of NLL. We consider PPL for the evaluation of models on __trwiki-67__, and BPC for __trnews-64__. Note that lower is better for both metrics.

We note that Perplexity needs to be computed with the same count of tokens, otherwise it needs to be normalized. Moreover, models considered to be evaluated using either of these corpora, are meant to have no training data other than that corpus' training split. 

**Normalizing perplexity**

The Perplexity metric is defined as the exponent of the average entropy over a corpus [^mikolov-etal-2011-perplexity^]:

$Perplexity(X_{test}) = exp(-\frac{1}{N} \sum_{i=1}^{n}log\ p_\theta(x_i|x_{test}{<i}))$

where $N$ is the original number of tokens in $X_{test}$, and $n$ is the number of tokens of $X_{test}$ when tokenized using a certain tokenization algorithm. Depending on what tokenization is used, $N$ might or might not be equal to $n$. To accommodate this issue, $N$ should always be the same when calculating perplexity for different models [^shoeybi-etal-2019-megatronlm^].

[^mikolov-etal-2011-perplexity^]: Tomas Mikolov, Anoop Deoras, Stefan Kombrink, Lukas Burget, and Jan "Honza" Cernocky. 2011. Empirical evaluation and combination of advanced language modeling techniques. In Interspeech. ISCA.

[^shoeybi-etal-2019-megatronlm^]: Mohammad Shoeybi, Mostofa Patwary, Raul Puri, Patrick LeGresley, Jared Casper, and Bryan Catanzaro. 2019. Megatron-lm: Training multi-billion parameter language models using model parallelism. Computing Research Repository, arXiv:1909.08053. Version 4.
