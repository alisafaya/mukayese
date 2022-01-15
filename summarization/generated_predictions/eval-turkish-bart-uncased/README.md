---
tags:
- generated_from_trainer
datasets:
- mlsum
model-index:
- name: eval-turkish-bart-uncased
  results: []
---

<!-- This model card has been generated automatically according to the information the Trainer had access to. You
should probably proofread and complete it, then remove this comment. -->

# eval-turkish-bart-uncased

This model is a fine-tuned version of [checkpoint-bart](https://huggingface.co/checkpoint-bart) on the mlsum tu dataset.

## Model description

More information needed

## Intended uses & limitations

More information needed

## Training and evaluation data

More information needed

## Training procedure

### Training hyperparameters

The following hyperparameters were used during training:
- learning_rate: 5e-05
- train_batch_size: 8
- eval_batch_size: 2
- seed: 42
- optimizer: Adam with betas=(0.9,0.999) and epsilon=1e-08
- lr_scheduler_type: linear
- num_epochs: 15.0
- label_smoothing_factor: 0.1

### Framework versions

- Transformers 4.11.3
- Pytorch 1.8.1+cu102
- Datasets 1.11.0
- Tokenizers 0.10.3
