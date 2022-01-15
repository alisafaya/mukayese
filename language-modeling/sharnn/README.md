# Single Headed Attention - Recurrent Neural Network

For full details about the model, see the paper [Single Headed Attention RNN: Stop Thinking With Your Head](https://arxiv.org/abs/1911.11423).

To reproduce our baselines you need to follow these instructions: 

## Environment set up

Set up your environment:

- Install PyTorch version 1.2+
- Install Nvidia's AMP
- Install the minimum trust variant of LAMB from [Smerity's PyTorch-LAMB](https://github.com/Smerity/pytorch-lamb)

## Clone SHA-RNN Code

```shell
git clone https://github.com/Smerity/sha-rnn.git
cd sha-rnn/
```

## Running on trnews-64

Download and extract data from the v1.0 release of [mukayese-datasets](https://github.com/mukayese-nlp/mukayese-datasets/releases/tag/v1.0):

```shell
mkdir data/trnews-64/
cd data/trnews-64/
mv /your/download/path/trnews-64.zip .
unzip trnews-64.zip
```
Then execute this python snippet to prepare data in a valid character format:

```python
for fn in ['train', 'valid', 'test']:
    part_str = ' '.join([str(c) if c != ord('\n') else '\n' for c in open(f"trnews-64.{fn}.raw", "rb").read() ])
    f = open(f"{fn}.txt", 'w').write(part_str)
```

Run training and evaluation

```shell
python -u main.py --epochs 12 --dropouth 0.1 --dropouti 0.1 --dropout 0.1 --data data/trnews-64/ --save TRNEWS.pt --log-interval 10 --seed 5512 --optimizer lamb --bptt 1024 --warmup 800 --lr 2e-3 --emsize 1024 --nhid 4096--nlayers 4 --batch_size 32
python -u main.py --epochs 6 --dropouth 0.1 --dropouti 0.1 --dropout 0.1 --data data/trnews-64/ --save TRNEWS.pt --log-interval 10 --seed 5512 --optimizer lamb --bptt 1024 --warmup 800 --lr 2e-3 --emsize 1024 --nhid 4096--nlayers 4 --batch_size 32 --resume TRNEWS.pt --seed 125 --lr 1e-3
```

This will take around ~24 hours on an instance with one V100 GPU. 

*Number of parameters: ~54M*

### Expected final output

```
=========================================================================================
| End of training | test loss  0.65 | test ppl     1.92 | test bpc    0.938
=========================================================================================
```

## Running on trwiki-67

Download and extract data from the v1.0 release of [mukayese-datasets](https://github.com/mukayese-nlp/mukayese-datasets/releases/tag/v1.0):

```shell
mkdir data/trwiki-67/
cd data/trwiki-67/
mv /your/download/path/trwiki-67.zip .
unzip trwiki-67.zip
mv trwiki-67.train.tokens train.txt
mv trwiki-67.valid.tokens valid.txt
mv trwiki-67.test.tokens test.txt
cd ../../
```

Run training and evaluation 

```shell
python -u main_trwiki.py --epochs 15 --dropouth 0.1 --dropouti 0.1 --dropout 0.1 --data data/trwiki-67/ --save TRWIKI.pt --log-interval 10 --seed 5512 --optimizer lamb --bptt 1024 --warmup 800 --lr 2e-3 --emsize 1024 --nhid 4096 --nlayers 4 --batch_size 16
python -u main_trwiki.py --epochs 15 --dropouth 0.1 --dropouti 0.1 --dropout 0.1 --data data/trwiki-67/ --save TRWIKI.pt --log-interval 10 --seed 5512 --optimizer lamb --bptt 1024 --warmup 800 --lr 2e-3 --emsize 1024 --nhid 4096 --nlayers 4 --batch_size 16 --resume TRWIKI.pt --lr 1e-3 --seed 125 --epochs 0
```

This will take around ~30 hours on an instance with one V100 GPU. 

*Number of parameters: ~87M*

### Expected final output

```
=========================================================================================
| End of training | test loss  2.53 | test ppl    12.54 | test bpc    3.648
=========================================================================================
```


