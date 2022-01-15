
source ~/anaconda3/bin/activate a100
cd tr-summarization
python -m torch.distributed.launch --nnodes=1 --nproc_per_node=8 --node_rank=0 transformers/examples/pytorch/summarization/run_summarization.py \
    --do_eval \
    --do_predict \
    --model_name_or_path ozcangundes/mt5-small-turkish-summarization \
    --dataset_name mlsum \
    --dataset_config "tu" \
    --source_prefix "summarize: " \
    --output_dir ./eval-ozcan-mt5/ \
    --per_device_eval_batch_size 16 \
    --predict_with_generate \
    --num_beams 4 \
    --group_by_length \
    --label_smoothing_factor 0.1
