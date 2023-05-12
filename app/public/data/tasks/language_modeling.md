# Language Modeling Leaderboard

This leaderboard presents the results and baseline models for the Language Modeling benchmark in the Mukayese Turkish NLP benchmark suite.

## Language Modeling

Auto-regressive language modeling focuses on modeling the probability $P(X)$ of a text sequence of $n$ tokens, where $X = (x_1, x_2, ..., x_n)$, and $P(X) = \prod_{i=1}^{n}P(x_i|x_{<i})$. The objective is to estimate the probability of a given text sequence.

In this benchmark, we focus on neural approaches for language modeling \cite{bengio-etal-2000-neurallm}. We introduce two benchmarking corpora for auto-regressive language modeling, namely \textsc{trnews-64} and \textsc{trwiki-67}, along with their train/validation/test splits. These corpora are designed similar to enwik8 \cite{hutter-2006-enwik8} and WikiText \cite{merity-etal-2017-wiki103} English corpora. Detailed statistics of these corpora are provided in Table \ref{tab:lm-datasets}.

### Datasets

1. **trwiki-67**: This language modeling corpus contains 67 million words of raw Turkish Wikipedia articles. The corpus was extracted from a recent Turkish Wikipedia dump using WikiExtractor \cite{attardi-2015-wikiextractor}. The raw text and titles of the articles are presented in their cased format, with no upper/lower case transformations. We also provide a tokenized version of this corpus, obtained using a sentencepiece unigram model \cite{kudo-2018-subword} with a vocabulary size of 32K. However, a raw version of the corpus is also provided for benchmarking on a character, subword, or word level.

2. **trnews-64**: This language modeling corpus consists of 64 million words of news columns and articles retrieved from the TS Timeline Corpus \cite{sezer-2017-tscorpus}. It contains relatively long documents and can be used as a benchmark for modeling long-range dependencies in the Turkish language. The corpus is lightly pre-processed for character-level modeling, and no further tokenization is applied.

### Metrics

Language models are trained on minimizing the negative log-likelihood (\textsc{Nll}) of the training set and are evaluated based on their generalization performance on the test set. For word or sub-word level language models, we use the word perplexity (\textsc{Ppl}) metric, which is a derivative of \textsc{Nll}. For character language models, we use the entropy-based Bits-per-character (\textsc{Bpc}) metric, which is another derivative of \textsc{Nll} \cite{chip-2019-evaluationlm}. Lower values indicate better performance for both metrics.

### Baselines

We consider two baseline models from different families:

1. **SHA-RNN**: Single Headed Attention - RNN is a Recurrent Neural Network-based language model \cite{merity-2019-sharnn}.

2. **Adaptive Transformer**: Adaptive Transformer is based on the Transformer architecture \cite{vaswani-etal-2017-attention} and incorporates adaptive computation \cite{sukhbaatar-etal-2019-adaptive}.

These models are selected to compare different model families (RNNs vs. Transformers). Additionally, they represent the state-of-the-art in terms of performance-to-training cost ratio and number of parameters compared to their counterparts. Detailed results of these baseline models on the \textsc{trwiki-67} and \textsc{trnews-64}
