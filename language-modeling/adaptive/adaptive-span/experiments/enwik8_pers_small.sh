#!/usr/bin/env bash

# Change ngpus to match the number of GPUs available.
# If run out of GPU memory, increase "--batch-split" argument.

# get the data

ngpus=1
args="
--data data/enwik8 \
--nlayers 18 \
--hid-sz 512 \
--inner-hid-sz 1 \
--nheads 8 \
--attn-span 8192 \
--block-sz 512 \
--batch-sz 64 \
--lr 0.07 \
--momentum 0 \
--dropout 0.3 \
--optim adagrad \
--lr-warmup 32000 \
--grad-clip 0.03 \
--niter 450 \
--nbatches 1000 \
--adapt-span \
--adapt-span-loss 0.0000001 \
--adapt-span-cache \
--pers-mem-size 1024 \
--batch-split 2 \
--distributed \
--checkpoint checkpoints/enwik8_pers_small.pt
"


echo "Training ..."
# using the pytorch distributed launching
python3 -m torch.distributed.launch --nproc_per_node=$ngpus main.py $args


echo "Fine-tuning ..."
# train another 20k steps with a 10x smaller learning rate
python3 -m torch.distributed.launch --nproc_per_node=$ngpus main.py $args \
  --lr 0.007 --niter 480


echo "Evaluation ..."
# use a smaller batch size to reduce tokens without context and omitted tokens.
python3 -m torch.distributed.launch --nproc_per_node=$ngpus main.py $args \
  --full-eval-mode --batch-sz 8
