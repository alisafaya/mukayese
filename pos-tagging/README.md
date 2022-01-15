## PoS Tagging Baselines

In this folder, you can find the training scripts for baselines. 

First, you should download the UD Boun dataset from the [link](https://github.com/UniversalDependencies/UD_Turkish-BOUN):

```
git clone https://github.com/UniversalDependencies/UD_Turkish-BOUN.git
```

### Requirments 

- flair==0.8.0.post1
- torch==1.7.1

There are two training scripts, first one is to train [BiLSTM-CRF model](https://pytorch.org/tutorials/beginner/nlp/advanced_tutorial.html) and second one is for training [Turkish BERT](https://github.com/stefan-it/turkish-bert).

For training BiLSTM-CRF model:
```
python train_ud_bound_bilstm.py path/to/ud_boun_dataset
```
After training is completed, this python script will create ```bilstm-pos-predictions.json``` file, and write the predictions to it.

For training Turkish Bert model:
```
python train_ud_boun_pos_trbert.py path/to/ud_boun_dataset
```
After training is completed, this python script will create ```bert-pos-predictions.json``` file, and write the predictions to it.
