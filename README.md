# Mukayese: Turkish NLP Strikes Back

Turkish Language Processing is left behind in developing state-of-the-art systems due to a lack of organized benchmarks and baselines. We fill this gap with __Mukayese__ (Turkish word for "comparison/benchmarking"), an extensive set of datasets and benchmarks for several Turkish NLP tasks. All of the datasets and code have been made public in this repository.

## Mukayese Baselines

We collect our documentation for reproducing the baselines for Mukayese in this repository. Baselines are listed according to each task below:

### Language Modeling

- [SHARNN: Single Headed Attention - Recurrent Neural Networks](language-modeling/sharnn)
- [Adaptive-Span: Adaptive Attention Span for Transformers](language-modeling/adaptive)

### Machine Translation (EN/TR):

- [Fairseq: Convolutional Sequence to Sequence Learning](machine-translation)
- [Transformer: Attention is all You Need](machine-translation)
- [mBART50: Multilingual Translation with Extensible Multilingual Pretraining and Finetuning](machine-translation)

### Named Entity Recognition

- [BiLSTM-CRF: Bi-directional Long Short Term Memory with Conditional Random Field](ner)
- [BERT: Pretrained Bi-directional Transformers](ner)
- [BERT-CRF: Pretrained Bi-directional Transformers with Conditional Random Field](ner)

### Part of Speech Tagging

- [BiLSTM-CRF: Bi-directional Long Short Term Memory with Conditional Random Field](pos-tagging)
- [BERT: Pretrained Bi-directional Transformers](pos-tagging)

### Sentence Segmentation

- [NLTK Punkt Sentence Tokenizer](segmentation)
- [SpaCy Sentencizer](segmentation)
- [ErSatz](https://github.com/rewicks/ersatz)

### Spell-checking and Correction

- [Hunspell Spell-checker](spell-checking)
- [Zemberek NLP tool](spell-checking)

### Summarization

- [Turkish BART from Scratch](summarization)
- [mBART](summarization)
- [mT5-Base](summarization)

### Text Classification

- [Sentence Convolutional Neural Networks](text-classification)
- [Bi-directional Long Short Term Memory](text-classification)
- [BERT: Pretrained Bi-directional Transformers](text-classification)
