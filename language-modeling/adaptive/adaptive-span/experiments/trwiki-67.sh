#!/usr/bin/env bash

args="
--data data/wikitext-103 \
--nlayers 12 \
--hid-sz 768 \
--inner-hid-sz 3072 \
--nheads 8 \
--attn-span 2048 \
--block-sz 256 \
--batch-sz 16 \
--lr 0.00025 \
--momentum 0 \
--dropout 0.3 \
--emb-dropout 0.1 \
--lr-warmup 32000 \
--grad-clip 1 \
--niter 200 \
--nbatches 1000 \
--optim adam \
--adapt-span \
--adapt-span-loss 0.0000005 \
--data-unit ppl \
--adapt-span-cache \
--adapt-io \
--adapt-io-tied \
--checkpoint checkpoints/wikitext-103.pt
"

echo "Training ..."
# using the pytorch distributed launching
python3 main.py $args

echo "Fine-tuning ..."
# train another 20k steps with a 10x smaller learning rate
python3 main.py $args \
  --lr 0.000025 --niter 400

echo "Evaluation ..."
# use a smaller batch size to reduce tokens without context and omitted tokens.
python3 main.py $args --full-eval-mode --batch-sz 8
