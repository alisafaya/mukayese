
# Turkish Text Classification task

For text classification task, we trained 3 different models:

- Bi-directional Long Short Term Memory
- CNN-Text Model
- BERT: Pretrained Bi-directional Transformers

### Environment 

- torch==1.8.1
- transformers==4.11.3

## Download datasets

Download and extract data from the v1.0 release of [mukayese-datasets](https://github.com/mukayese-nlp/mukayese-datasets/releases/tag/v1.0):

```shell
mkdir -p datasets
cd datasets/
mv /your/download/path/offenseval.zip .
mv /your/download/path/news-cat.zip .
unzip offenseval.zip
unzip news-cat.zip
```

## Dataset statistics

|             | Offenseval    | News-cat    |
|:-----------:|:-------------:|:-----------:|
| Avg. #words | 8.5           | 227.3       |
|  #Classes   | 2             | 5           |
| Training    | 28,000        | 750         |
| Validation  | 3277          | 150         |
| Test        | 3515          | 250         |
| Total       | 34792         | 1150        |


## Running the task

```shell
python -m src.main
```

## Baselines expected performance

|          | offenseval    | news-cat    |  Avg. |
|----------|:-------------:|:-----------:|:-----:|
| BiLSTM   | 0.747         | 0.808       | 0.777 |
| CNN Text | 0.751         | 0.883       | 0.817 |
| BERT     | 0.823         | 0.944       | 0.883 |
