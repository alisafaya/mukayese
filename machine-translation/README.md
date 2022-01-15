# Machine Translation

This folder contains information and some scripts about the trained models for Machine translation task.

### Dataset 

Download and extract data from the v1.0 release of [mukayese-datasets](https://github.com/mukayese-nlp/mukayese-datasets/releases/tag/v1.0).

### Dataset Format

All of the translated sentences in the dataset are formatted as follows:
```json
{
    "sentence" : "I'm going to talk today about energy and climate.",
    "translation" : "Bugun enerji ve iklim hakkında konuşacağım."
}
```

### Baseline Models

For Convolutional Sequence to Sequence Learning (Fairseq) and Transformer, first prepare the datasets using the provided preparation [scripts](./data), then run your experiments from [fairseq.sh](./fairseq.sh). For mBART50 you can use experiments in [train_bart50.sh](./train_bart50.sh).

For example, to run the baseline model for the English-Turkish translation on WMT16, run the following command:

```shell
CUDA_VISIBLE_DEVICES=0 fairseq-train \
    data-bin/wmt16-en-tr \
    --arch transformer_iwslt_de_en --share-decoder-input-output-embed \
    --optimizer adam --adam-betas '(0.9, 0.98)' --clip-norm 0.0 \
    --lr 5e-4 --lr-scheduler inverse_sqrt --warmup-updates 4000 \
    --dropout 0.3 --weight-decay 0.0001 \
    --criterion label_smoothed_cross_entropy --label-smoothing 0.1 \
    --max-tokens 4096 \
    --eval-bleu \
    --eval-bleu-args '{"beam": 5, "max_len_a": 1.2, "max_len_b": 10}' \
    --eval-bleu-detok moses \
    --eval-bleu-remove-bpe \
    --eval-bleu-print-samples \
    --best-checkpoint-metric bleu --maximize-best-checkpoint-metric
```