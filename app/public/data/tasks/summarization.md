# 📖  Summarization

This leaderboard provides the results and baseline models for the Summarization benchmark in the Mukayese Turkish NLP benchmark suite.

Abstractive text summarization is the task of generating a short description (summary) of an article (longer text). Formally, given a sequence of tokens (input article) `X = (x1 , x2 , ..., xn )` and its summary `Y = (y1, y2, ..., ym)`, the main task is to model the conditional probability: `P (Y |X ) = Qmi=1 P (yi |y<i , X )`.

For this task, we work on the Multi-lingual Summarization (MLSUM) dataset [^scialom^] and present state-of-the-art summarization results for Turkish.

[^scialom^]: Thomas Scialom, Paul-Alexis Dray, Sylvain Lamprier, Benjamin Piwowarski, and Jacopo Staiano. 2020. [MLSUM: The multilingual summarization corpus](https://aclanthology.org/2020.emnlp-main.647/). In Proceedings of the 2020 Conference on Empirical Methods in Natural Language Processing (EMNLP), pages 8051–8067, Online. Association for Computational Linguistics.

## 📊 Leaderboard

| Baseline | Verified | Model | ROUGE-L | METEOR |
| -------- | -------- |:----- |:-------:|:------:|
| ❌ | ❌ | (Scialom et al., 2020) | 32.90/ – | 26.30/ – |
| ✅ | ✅ | [TRBART (120M)](https://github.com/alisafaya/mukayese/tree/v0.0.1/summarization/) | 35.54/35.08 | 26.47/25.81 |
| ✅ | ✅ | [MBART50 (680M)](https://github.com/alisafaya/mukayese/tree/v0.0.1/summarization/) | 39.21/38.47 | 30.84/30.36 |
| ✅ | ✅ | [MT5-BASE (220M)](https://github.com/alisafaya/mukayese/tree/v0.0.1/summarization/) | **39.92/38.76** | **31.72/31.47** |

## 📚 Datasets

**MLSUM** is a multi-lingual dataset for abstractive summarization. This dataset consists of a large set of crawled news articles with their abstracts in multiple languages. We focus on the Turkish subset of **MLSUM**. 

|               | Original | Cleaned |
|---------------|----------|---------|
| Avg. article length | 259.1 | 258.4 |
| Avg. summary length | 18.5 | 18.3 |
| Splits | | |
| Training | 249277 | 246490 |
| Validation | 11565 | 10852 |
| Test | 12775 | 11897 |
| Total | 273617 | 269239 |

_Statistics of the Turkish subset of MLSUM. The number of samples is provided for each split before and after the deduplication._

For a more accurate evaluation, We removed 4378 duplicated instances and 12 overlapping instances among the splits while assessing the dataset’s quality, and we evaluated our models on both the original and the cleaned sets.

## 📏 Metrics

To assess the quality of the generated summaries, we use the N-gram co-occurrence-based ROUGE-L [^lin^] and METEOR [^baner-jee^] metrics. We report two different results for each model, one on the original, and one for the cleaned set.

[^lin^]: Chin-Yew Lin. 2004. [ROUGE: A package for automatic evaluation of summaries](https://aclanthology.org/W04-1013/). In Text Summarization Branches Out, pages 74–81, Barcelona, Spain. Association for Computational Linguistics.

[^baner-jee^]: Satanjeev Banerjee and Alon Lavie. 2005. [METEOR: An automatic metric for MT evaluation with improved correlation with human judgments](https://aclanthology.org/W05-0909/). In Proceedings of the ACL Workshop on Intrinsic and Extrinsic Evaluation Measures for Machine Translation and/or Summarization, pages 65–72, Ann Arbor, Michigan. Association for Computational Linguistics.