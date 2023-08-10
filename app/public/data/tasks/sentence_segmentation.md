# 📖 Sentence Segmentation

This leaderboard provides the results and baseline models for the Sentence Segmentation benchmark in the Mukayese Turkish NLP benchmark suite.

Sentence segmentation is the task of detecting sentence boundaries in a given article. Despite its fundamental place in the NLP pipelines, sentence segmentation attracts little interest. Common approaches are rule-based systems that rely on cues such as punctuation marks and capital letters [^rafsky-martin^].

[^rafsky-martin^]: Daniel Jurafsky and James H Martin. 2018. Speech and language processing (draft).

## 📊 Leaderboard

| Baseline | Verified | Model | F1-SCORE | PRECISION | RECALL | 
| -------- | -------- |:----- |:--------:|:---------:|:------:|
| ✅ | ✅ | [SPACY](https://github.com/alisafaya/mukayese/tree/v0.0.1/segmentation/) | 0.74 / 0.37 | 0.76 / 0.48 | 0.72 / 0.30 |
| | | *Training (Original)* | | | | |
| ✅ | ✅ | [ERSATZ](https://github.com/alisafaya/mukayese/tree/v0.0.1/segmentation/) | **0.89 / 0.40** | **0.98** / 0.51 | 0.81 / **0.33** | 
| ✅ | ✅ | [PUNKT](https://github.com/alisafaya/mukayese/tree/v0.0.1/segmentation/) | 0.87 / 0.39 | 0.88 / **0.52** | **0.86** / 0.32 | 
| | | *Training (Corrupted)* | | | | |
| ✅ | ✅ | [ERSATZ](https://github.com/alisafaya/mukayese/tree/v0.0.1/segmentation/) | **0.88 / 0.40** | **0.97 / 0.51** | 0.81 / **0.33** | 
| ✅ | ✅ | [PUNKT](https://github.com/alisafaya/mukayese/tree/v0.0.1/segmentation/) | 0.85 / 0.39 | 0.86 / 0.50 | **0.84** / 0.31 |

_Results of sentence segmentation baselines. Metrics are reported for both corrupted and clean versions of the test set in the ORIGINAL / CORRUPTED format._

## 📚 Datasets

We present **TRSEG-41**, a new sentence segmentation dataset for Turkish. This dataset consists of 300 sampled scientific abstracts from (Özturk et al., 2014 [^ozturk^]), 300 curated news articles from **TRNEWS-64**, and a set of 10K tweets.



[^ozturk^]: Seçil Özturk, Bülent Sankur, Tunga Gungör, Mustafa Berkay Yilmaz, Bilge Köroğlu, Onur Ağin, Mustafa İşbilen, Çağdaş Ulaş, and Mehmet Ahat. 2014. Turkish labeled text corpus. In 2014 22nd Signal Processing and Communications Applications Conference (SIU), pages 1395–1398. IEEE.

|         | \#Articles| \#Sentences | \#Words |
|---------|-----------|-------------|---------|
| News | 300 | 6K | 102K |
| Tweets | 10K | 28K | 242K |
| Abstracts | 300 | 6K | 112K |
| Total | 10.6K | 40K | 456K |

_Statistics of TRSEG-41 dataset._

For the scientific abstracts, our sampling rationale is to maximize the number of abbreviations that reduce the accuracy of the rule-based approaches. As for the news subset, we maximize the length of documents and the number of proper nouns. In the Twitter subset, we balance the number of multi/single sentence tweets, and preprocess the tweets by replacing all URLs with `http://some.url`, and all user mentions with `@user`.

Applying sentence segmentation to user-generated content such as social media posts or comments can be quite challenging. To simulate such difficult cases and expose the weaknesses of rule-based methods, we created another version of **TRSEG-41** where we artificially corrupt the boundaries of sentences. This is done by randomly converting sentences to lowercase or uppercase with 50% probability, or by removing all punctuation marks with 50% probability.

## 📏 Metrics

Our evaluation procedure is based on the metrics F1 score, Precision, Recall for each segment. Unlike (Wicks and Post, 2021 [^wicks-post^]), we evaluate our models on the entire test set, without removing sentences with ambiguous boundaries. Furthermore, in order to highlight the gap in performance, we cross-evaluate our systems on the original and corrupted set.

[^wicks-post^]: Rachel Wicks and Matt Post. 2021. [A unified approach to sentence segmentation of punctuated text in many languages](https://aclanthology.org/2021.acl-long.309/). In Proceedings of the 59th Annual Meeting of the Association for Computational Linguistics and the 11th International Joint Conference on Natural Language Processing (Volume 1: Long Papers), pages 3995–4007, Online. Association for Computational Linguistics.