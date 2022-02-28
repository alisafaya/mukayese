# Mukayese: Turkish NLP Strikes Back

<p align="center">
<img align="center" src="https://raw.githubusercontent.com/alisafaya/mukayese/main/cover.png" width=60% height=60%>
</p>

Turkish Natural Language Processing is left behind in developing state-of-the-art systems due to a lack of organized benchmarks and baselines. We fill this gap with __Mukayese__ (Turkish word for "comparison/benchmarking"), an extensive set of datasets and benchmarks for several Turkish NLP tasks. All of the datasets and code have been made public in this repository.

## Updates

- (25/02/2022) Datasets have been made available through pre-release [v0.0.1](https://github.com/alisafaya/mukayese/releases/tag/v0.0.1)

## What to do with Mukayese ?

With Mukayese, researchers of Turkish NLP will be able to:

 - Compare the performance of existing methods in leaderboards.
 - Access existing implementations of NLP baselines.
 - Evaluate their own methods on the relevant test datasets.
 - Submit their own work to be enlisted in our leaderboards.

## Mukayese's Mission

The most important goal of Mukayese is to standardize the comparison and evaluation of Turkish NLP methods. As a result of the lack of a platform for benchmarking, Turkish NLP researchers struggle with comparing their models to the existing ones.

## Maintainers

- Ali Safaya - @alisafaya
- Emirhan Kurtuluş - @ekurtulus
- Arda Göktoğan - @ardofski

## Mukayese Tasks

We collect our documentation for reproducing the baselines for Mukayese in this repository. Baselines are listed according to each task below:

### Language Modeling

_Datasets_

- [trnews-64](https://data.tdd.ai/#/4e30ae7a-1624-4e3e-9f72-d85fafdd3551)
- [trwiki-67](https://data.tdd.ai/#/6bdc4da6-7638-4adc-825b-d101918439bb)

_Baselines_

- [SHARNN: Single Headed Attention - Recurrent Neural Networks](language-modeling/sharnn)
- [Adaptive-Span: Adaptive Attention Span for Transformers](language-modeling/adaptive)

### Machine Translation (EN/TR):

_Datasets_

- [WMT16](https://data.tdd.ai/#/6c054fe0-22ba-444f-b88c-2445ca1f47e4)
- [MuST-C](https://ict.fbk.eu/must-c/)

_Baselines_

- [Fairseq: Convolutional Sequence to Sequence Learning](machine-translation)
- [Transformer: Attention is all You Need](machine-translation)
- [mBART50: Multilingual Translation with Extensible Multilingual Pretraining and Finetuning](machine-translation)

### Named Entity Recognition

_Datasets_

- [MilliyetNER](https://data.tdd.ai/#/effafb5f-ebfc-4e5c-9a63-4f709ec1a135)
- [WikiANN](https://data.tdd.ai/#/62addefe-3f08-4fd5-8d3a-f16ef50113b1)
 
_Baselines_

- [BiLSTM-CRF: Bi-directional Long Short Term Memory with Conditional Random Field](ner)
- [BERT: Pretrained Bi-directional Transformers](ner)
- [BERT-CRF: Pretrained Bi-directional Transformers with Conditional Random Field](ner)

<!-- 
### Part of Speech Tagging

- [BiLSTM-CRF: Bi-directional Long Short Term Memory with Conditional Random Field](pos-tagging)
- [BERT: Pretrained Bi-directional Transformers](pos-tagging)
 -->
 
### Sentence Segmentation

_Datasets_

- [trseg-41](https://data.tdd.ai/#/72207c43-e123-4ce9-aa8a-84af68181e47)

_Baselines_

- [NLTK Punkt Sentence Tokenizer](segmentation)
- [SpaCy Sentencizer](segmentation)
- [ErSatz](https://github.com/rewicks/ersatz)

### Spell-checking and Correction

_Datasets_

- [trspell-10](https://data.tdd.ai/#/3477863a-9a7d-4b96-b13f-7afac1490ce0)

_Baselines_

- [Hunspell Spell-checker](spell-checking)
- [Zemberek NLP tool](spell-checking)

### Summarization

_Datasets_

- [trsum](https://data.tdd.ai/#/f90a0f7a-3108-4fc2-8812-b422d4550764)

_Baselines_

- [Turkish BART from Scratch](summarization)
- [mBART](summarization)
- [mT5-Base](summarization)

### Text Classification

_Datasets_

- [OffensEval2020](https://data.tdd.ai/#/53b6ca44-e95e-443d-bb9e-978327c59fc5)
- [News-Cat](https://data.tdd.ai/#/d2fe5fc8-2d2f-4fde-aad6-5e4b0dd1c1db)

_Baselines_

- [Sentence Convolutional Neural Networks](text-classification)
- [Bi-directional Long Short Term Memory](text-classification)
- [BERT: Pretrained Bi-directional Transformers](text-classification)

