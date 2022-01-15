## Spell Checking

### Requirments

```
- cyhunspell==2.0.2
- zemberek-python==0.1.2
```

### trspell-10 dataset

Download and extract data from the v1.0 release of [mukayese-datasets](https://github.com/mukayese-nlp/mukayese-datasets/releases/tag/v1.0).

```shell
cp /data/to/mukayese-datasets/trspell-10.zip .
unzip trspell-10.zip
```

### Hunspell Based Turkish Spell Checkers

Hunspell spell checking models consist of two files : `.dic` and `.aff`. 
First file contains the word roots and second file contains the affixes. 

```
python predict_hunspell.py hrzafer trspell-10.csv hrzafer_preds.jsonl
python predict_hunspell.py ours trspell-10.csv ours_preds.jsonl
```

### Zemberek Based Turkish Spell Checkers

```
python predict_zemberek.py trspell-10.csv zemberek_preds.jsonl
```

## Evaluation 

You can evaluate predictions using [evaluate.py](evaluate.py) script.

Evaluating Hunspell based hrzafer predictions:

```
$ python evaluate.py --input-file hrzafer_preds.jsonl 

Error Detection Scores:
	Precision = 76.40
	Recall = 99.73
	F1-Score = 86.52

Error Correction Accuracy = 25.52
```

Evaluating Hunspell based ours predictions:

```
$ python evaluate.py --input-file ours_preds.jsonl

Error Detection Scores:
	Precision = 100.00
	Recall = 99.25
	F1-Score = 99.62

Error Correction Accuracy = 71.72
```

Evaluating Zemberek based predictions:


```
$ python evaluate.py --input-file zemberek_preds.jsonl

Error Detection Scores:
	Precision = 94.31
	Recall = 98.93
	F1-Score = 96.56

Error Correction Accuracy = 62.12
```
