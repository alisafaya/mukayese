## NER Baselines

In this folder, you can find training scripts of BiLSTM-CRF and [Turkish BERT](https://github.com/stefan-it/turkish-bert), and BERT-CRF models for Named Entity Recognition task. 

### Environment 

- flair==0.8.0.post1
- torch==1.7.1

## Download Dataset

Two datasets should be downloaded for training. 
Download data from the v1.0 release of [mukayese-datasets](https://github.com/mukayese-nlp/mukayese-datasets/releases/tag/v1.0).

Then extract the files using unzip:

```
unzip milliyet-ner.zip
unzip wikiann.zip
```

## Training

After downloading milliyet-ner and WikiANN datasets, you can run the training script. For instance to run the training of BERT:

```
bash bert/run.sh wikiann milliyet-ner
```
