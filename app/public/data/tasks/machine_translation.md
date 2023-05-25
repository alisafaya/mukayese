# 📖 Machine Translation

This leaderboard provides the results and baseline models for the Machine Translation benchmark in the Mukayese Turkish NLP benchmark suite.

Machine translation is the task of translating text from one language to another. Neural machine translation models have gained prominence, particularly in low-resource settings, benefiting from transfer learning [^zoph-etal-2016-transfer^]. In this work, we focus on evaluating neural machine translation models for translating between English and Turkish languages. We present the results of three different baselines on two datasets.

[^zoph-etal-2016-transfer^]: Barret Zoph, Deniz Yuret, Jonathan May, and Kevin Knight. 2016. Transfer Learning for Low-Resource Neural Machine Translation. In Proceedings of the 2016 Conference on Empirical Methods in Natural Language Processing, pages 1568–1575, Austin, Texas. Association for Computational Linguistics.

## 📊 Leaderboard

| Baseline | Verified | Model | WMT-16 (tr-en) | MuST-C (tr-en) | WMT-16 (en-tr) | MuST-C (en-tr) |
| -------- | -------- |:--- |:---:|:---:|:---:|:---:| 
| ❌ | ❌ | Stahlberg et al. (2018) | 19.17 | - | 13.61 | - |
| ✅ | ✅ | [ConvS2S](https://github.com/alisafaya/mukayese/tree/v0.0.1/machine-translation/) (180M) | 13.22 | 21.79 | 12.78 | 13.3 |
| ✅ | ✅ | [Transformer](https://github.com/alisafaya/mukayese/tree/v0.0.1/machine-translation/) (58M) | 17.29 | 27.01 | 15.72 | 15.52 |
| ✅ | ✅ | [mBart50](https://github.com/alisafaya/mukayese/tree/v0.0.1/machine-translation/) (680M) | **24.17** | **32.97** | **18.54** | **19.61** |

_BLEU scores of machine translation baselines. Results are provided for translations in both directions._

## 📚 Datasets

We utilize two datasets for Machine Translation, the **WMT-16** dataset [^wmt-16^], which was presented at the first Conference on Machine Translation (WMT), and the **MuST-C** dataset [^digangi-etal-2019-mustc^]. The **MuST-C** corpus consists of subtitles from movies and TV shows.

__WMT-16__: This dataset consists of manually translated Turkish-English sentence pairs.

__MuST-C__: This dataset is extracted from movies and TV show subtitles.

__WMT-16__ and __MuST-C__ refer to the Turkish-English subsets.

|             | \# Sentences | \# Words |
|-------------|--------------|----------|
| **Turkish** |              |          |
| MuST-C      | 236K / 1.3K / 2K  | 3.4M / 19K / 33K     |
| WMT-16      | 205K / 1K / 3K   | 3.6M / 14K / 44K      |
| **English** |              |          |
| MuST-C      | 236K / 1K / 2K   | 4.6M / 26K / 45K     |
| WMT-16      | 205K / 1K / 3K   | 4.4M / 19K / 58K      |

_Statistics of machine translation datasets. Each cell represents the (Train/Validation/Test) values of the datasets in the corresponding row. **WMT-16** and **MuST-C** refer to Turkish-English subsets._

[^wmt-16^]: [ACL 2016 - FIRST CONFERENCE ON MACHINE TRANSLATION (WMT16)](https://www.statmt.org/wmt16/)

[^digangi-etal-2019-mustc^]: Mattia A. Di Gangi, Roldano Cattoni, Luisa Bentivogli, Matteo Negri, and Marco Turchi. 2019. MuST-C: a Multilingual Speech Translation Corpus. In Proceedings of the 2019 Conference of the North American Chapter of the Association for Computational Linguistics: Human Language Technologies, Volume 1 (Long and Short Papers), pages 2012–2017, Minneapolis, Minnesota. Association for Computational Linguistics.

## 📏 Metrics

We evaluate our models on the relevant test sets for translation in both directions. We utilize _SacreBLEU_ [^post-2018-call^] for the assessment of translation quality.

[^post-2018-call^]: Matt Post. 2018. A call for clarity in reporting BLEU scores. In Proceedings of the Third Conference on Machine Translation: Research Papers, pages 186–191, Belgium, Brussels. Association for Computational Linguistics.