# 📖 Named-Entity Recognition (NER)

This leaderboard provides the results and baseline models for the Named-Entity Recognition (NER) benchmark in the Mukayese Turkish NLP benchmark suite.

Named Entity Recognition has an essential role in NLP applications. In this work, words representing named-entities are detected in the text input and assigned one of the predefined namedentity classes such as Person or Location [^chinchor-and-robinson^]

We benchmark three different models on two NER datasets for Turkish and compare our work with existing research efforts.

[^chinchor-and-robinson^]: N. Chinchor and P. Robinson. 1998. [Appendix E: MUC7 named entity task definition (version 3.5)](https://aclanthology.org/M98-1028/). In Seventh Message Understanding Conference (MUC-7): Proceedings of a Conference Held in Fairfax, Virginia, April 29 - May 1, 1998.

## 📊 Leaderboard

| Baseline | Verified | Model | MILLIYET | WikiANN |
| -------- | -------- |:--- |:----:|:----:|
| ❌ | ❌ | [Yeniterzi, 2011](https://aclanthology.org/P11-3019/) | 91.56 | - |
| ❌ | ❌ | [Şeker and Eryiğit, 2012](https://aclanthology.org/C12-1150/) | 91.94 | - |
| ❌ | ❌ | [Güngör et al., 2018](https://ieeexplore.ieee.org/document/8404788)    | 93.37 | - |
| ✅ | ✅ | [BILSTM-CRF](https://github.com/alisafaya/mukayese/tree/v0.0.1/ner/) | 95.54 | **93.8** |
| ✅ | ✅ | [BERTurk](https://github.com/alisafaya/mukayese/tree/v0.0.1/ner/) | 95.31 | 92.82 |
| ✅ | ✅ | [BERTurk-CRF](https://github.com/alisafaya/mukayese/tree/v0.0.1/ner/) | **96.48**  | 93.07 |

_Evaluation results (CoNLL F1) of NER models on test sets._

## 📚 Datasets

The first dataset we use is **MilliyetNER** [^tur^], which is a set of manually, annotated news articles from the Turkish [Milliyet] news resource .The second is the Turkish subset of the semi-automatically annotated Cross-lingual NER dataset **WikiANN** or (PAN-X)[^pan^], which consists of Turkish Wikipedia articles.

|             | Training | Validation | Test |
|------------|------------|------------|------------|
| **WikiANN** | | | |
| Location | 9679 | 5014 | 4914 |
| Organization | 7970 | 4129 | 4154 |
| Person | 8833 | 4374 | 4519 |
| **Total Words** | 149786 | 75930 | 75731 |
| **MilliyetNER** | | | |
| Location | 8821 | 942 | 1126 |
| Organization | 8316 | 842 | 873 |
| Person | 13290 | 1400 | 1603 |
| **Total Words** | 419996 | 45532 | 49595 |

_Distribution of Named entities over classes in MilliyetNER and WikiANN datasets._

[^tur^]: Gökhan Tür, Dilek Hakkani-TüR, and Kemal Oflazer. 2003.[ A statistical information extraction system for turkish](https://www.cambridge.org/core/journals/natural-language-engineering/article/abs/statistical-information-extraction-system-for-turkish/7C288FAFC71D5F0763C1F8CE66464017). Natural Language Engineering, 9(2):181–210

[Milliyet]: <https://www.milliyet.com.tr/>

[^pan^]: Xiaoman Pan, Boliang Zhang, Jonathan May, Joel Nothman, Kevin Knight, and Heng Ji. 2017. [Cross-lingual name tagging and linking for 282 languages](https://aclanthology.org/P17-1178/). In Proceedings of the 55th Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers), pages 1946–1958, Vancouver, Canada. Association for Computational Linguistics.

## 📏 Metrics

Following previous work on Turkish NER [^yeniterzi^], we report the CoNLL F-1 metric [^tjogn-kim-snag^] to assess our NER baselines. CoNLL F1 counts a named entity as correct, only if it is an exact match of the corresponding entity in the ground truth.

[^yeniterzi^]: Reyyan Yeniterzi. 2011. [Exploiting morphology in Turkish named entity recognition system](https://aclanthology.org/P11-3019/). In Proceedings of the ACL 2011 Student Session, pages 105–110, Portland, OR, USA. Association for Computational Linguistics.

[^tjogn-kim-snag^]: Erik F. Tjong Kim Sang. 2002. [Introduction to the CoNLL-2002 shared task: Language-independent named entity recognition](https://aclanthology.org/W02-2024/). In COLING-02: The 6th Conference on Natural Language Learning 2002 (CoNLL-2002).