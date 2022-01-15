#!/usr/bin/env bash

# get the data
# bash get_data.sh
mkdir -p checkpoints

args="
--data data/enwik8 \
--nlayers 12 \
--hid-sz 512 \
--inner-hid-sz 2048 \
--nheads 8 \
--attn-span 8192 \
--block-sz 512 \
--batch-sz 16 \
--lr 0.00025 \
--lr-warmup 2000 \
--momentum 0 \
--dropout 0.3 \
--optim adam \
--grad-clip 1 \
--niter 200 \
--nbatches 1000 \
--adapt-span \
--adapt-span-loss 0.0000005 \
--adapt-span-cache \
--checkpoint checkpoints/enwik8.pt
"

echo "Training ..."
# using the pytorch distributed launching
# python3 main.py $args

echo "Fine-tuning ..."
# train another 20k steps with a 10x smaller learning rate
python3 main.py $args \
  --lr 0.00005 --niter 450

echo "Evaluation ..."
# use a smaller batch size to reduce tokens without context and omitted tokens.
python3 main.py $args --full-eval-mode --batch-sz 8
