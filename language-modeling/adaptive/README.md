# Adaptive-Span: Adaptive Attention Span for Transformers

For full details about the model, see the paper [Adaptive Attention Span for Transformers](https://arxiv.org/abs/1905.07799).

To reproduce our baselines you need to follow these instructions: 

## Environment set up

Set up your environment:

- Install PyTorch version 1.2+

```shell
cd adaptive-span
```

## Running on trnews-64

Download and extract data from the v1.0 release of [mukayese-datasets](https://github.com/mukayese-nlp/mukayese-datasets/releases/tag/v1.0):

```shell
mv /your/download/path/trnews-64.zip data/enwik8/
cd data/enwik8/
unzip trnews-64.zip
mv trnews-64.test.raw test.txt
mv trnews-64.train.raw train.txt
mv trnews-64.val.raw valid.txt
python prep_enwik8.py
cd ../../
```

Run training and evaluation:

```shell
./experiments/trnews-64.sh
```

This will take around ~72 hours on an instance with one V100 GPU. 

*Number of parameters: ~38.46M*

### Expected Evaluation output

```
val: 1.020bpc
test: 1.024bpc
```

## Running on trwiki-67

Download and extract data from the v1.0 release of [mukayese-datasets](https://github.com/mukayese-nlp/mukayese-datasets/releases/tag/v1.0):

```shell
mv /your/download/path/trwiki-67.zip data/wikitext-103/
cd data/wikitext-103/
unzip trwiki-67.zip
rm trwiki-67.zip
mv trwiki-67.train.tokens train.txt
mv trwiki-67.valid.tokens valid.txt
mv trwiki-67.test.tokens test.txt
cd ../../
```

Run training and evaluation 

```shell
./experiments/trwiki-67.sh
```

This will take around ~72 hours on an instance with one V100 GPU. 

*Number of parameters: ~92.31M*

### Expected Evaluation output

```
val: 15.09ppl
test: 14.64ppl
```


