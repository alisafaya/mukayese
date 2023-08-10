# 📖 Text Classification

This leaderboard provides the results and baseline models for the Text Classification benchmark in the Mukayese Turkish NLP benchmark suite. 

Text classification can be utilized in several applications such as sentiment analysis or topic identification. In this task a sequence of text is taken as an input, and outputs a probability distribution over the given classes.

In our work on Turkish we benchmark three models on two datasets from different domains.

## 📊 Leaderboard

| Baseline | Verified | Model | OFFENSEVAL | NEWS-CAT | Avg. |
| -------- | -------- |:----- |:----------:|:--------:|:----:|
| ✅ | ✅ | [BILSTM](https://github.com/alisafaya/mukayese/tree/v0.0.1/text-classification/) | 0.747 | 0.808 | 0.777 |
| ✅ | ✅ | [CNN-TEXT](https://github.com/alisafaya/mukayese/tree/v0.0.1/text-classification/) | 0.751 | 0.883 | 0.817 |
| ✅ | ✅ | [BERTURK](https://github.com/alisafaya/mukayese/tree/v0.0.1/text-classification/) | **0.823** | **0.944** | **0.883** |

_Evaluation results (macro averaged F1-Score) of our baseline models for text classification task. The last column represent the average F1-scores of each model._

## 📚 Datasets

We work on the **news categorization (NEWS-CAT)** dataset [^amasyali^]. In this dataset, news articles are labeled with one of the following five categories health, sports, economy, politics, magazine. 

The second dataset is the corpus of **Offensive Speech Identification** in Social media (OFFENSEVAL) [^coltekin^]. This dataset was collected from Twitter, where the tweets are annotated for offensive speech with offensive, or non-offensive labels.

We choose these datasets for benchmarking since they vary in domain and average article length.

|           | OFFENSEVAL | NEWS-CAT |
|-----------|------------|----------|
| Avg. \#words | 8.5 | 227.3 |
| \#Classes | 2 | 5 |
| Splits | | |
| Training | 28000 | 750 |
| Validation | 3277 | 150 |
| Test | 3515 | 250 |
| Total | 34792 | 1150 |

_Statistics of NEWS-CAT and OFFENSEVAL dataset splits._

In **(NEWS-CAT)**, there is no splits provided in the original work for NEWS-CAT dataset, hence we shuffle the dataset and construct our own splits in a stratified way, keeping the class distribution balanced across splits. We use 750 samples for training, 150 samples for validation, and 250 samples for testing.

[^amasyali^]: MF Amasyalı and T Yıldırım. 2004. Otomatik haber metinleri sınıflandırma. In 2004 12th Signal Process- ing and Communications Applications Conference (SIU), pages 224–226. IEEE.

[^coltekin^]: Çağrı Çöltekin. 2020. [A corpus of Turkish offensive language on social media](https://aclanthology.org/2020.lrec-1.758/). In Proceedings of the 12th Language Resources and Evaluation Confer- ence, pages 6174–6184, Marseille, France. European Language Resources Association.

## 📏 Metrics

We use the macro averaged F1-Score to account for the imbalance in classes within the datasets.