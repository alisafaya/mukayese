# 📖  Spellchecking and Correction

This leaderboard provides the results and baseline models for the Spellchecking and Correction benchmark in the Mukayese Turkish NLP benchmark suite.

Spellchecking and Correction is the task of checking for misspellings in an input and suggesting a set of corrections. Different methods can be employed for error correction, such as looking up words that minimize the edit distance from a dictionary or utilizing probabilistic models with N-grams to suggest the most likely correct word based on the context [^jurafsky-martin^].

In this work, we focus on contextless (single word) spellchecking and correction as a start, and leave in-context spellchecking for future work. We also present a new benchmarking dataset for contextless spellcheckers and a computationally efficient and accurate dictionary for Turkish.

[^jurafsky-martin^]: Daniel Jurafsky and James H Martin. 2018. Speech and language processing (draft)

## 📊 Leaderboard

| Baseline | Verified | Model | SCA | F1 |
| -------- |--------- |:----- |-----|----|
| ❌ | ❌ | Hunspell-TR (Zafer, 2017) | 25.52 | 86.52 |
| ❌ | ❌ | Zemberek (Akın and Akın, 2007) | 62.12 | 96.56 |
| ✅ | ✅ | [OUR Hunspell](https://github.com/alisafaya/mukayese/tree/v0.0.1/spell-checking/) | **71.72** | **99.62** |

_Spell correction accuracy (SCA) and macroaveraged F1 scores of spellchecking methods on TRSPELL-10._

## 📚 Datasets

We present **TRSPELL-10**, a dataset of 10K words, for benchmarking spellchecking and correction. The dataset consists of tuples of input and correct (gold) words. This dataset was created by randomly sampling **8500 Turkish words** from the TS Corpus Word List [^sezer^]

We created artificial misspellings by applying random insertions, deletions and substitutions on 65% of the words, where we apply at most two operations on the same word. The remaining 35% of the words are unchanged. Moreover, we add 1K random foreign words, and 500 randomly generated word-like character sequences.

As a quality check of these artificial misspellings, given a list of corrupted words, our annotators to provided us a list of suggestions up to 10 suggestions per word. Their suggestion lists had the gold output 91% of the time.

[^sezer^]: Taner Sezer. 2013. Ts corpus: Herkes İçin Türkçe Derlem. Proceedings 27th National Linguistics Conference, pages 217–225.

## 📏 Metrics

We evaluate spellcheckers’ ability to detect misspellings using the macro-averaged F1-Score metric. Additionally, we evaluate their spell correction accuracy (SCA) based on the suggestions provided for misspelled words.