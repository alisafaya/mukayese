python -m torch.distributed.launch --nnodes=1 --nproc_per_node=8 --node_rank=0 transformers/examples/pytorch/summarization/run_summarization.py  \
    --model_name_or_path "facebook/mbart-large-50" \
    --do_eval \
    --do_train \
    --do_predict \
    --dataset_name mlsum \
    --dataset_config "tu" \
    --output_dir ./eval-tr-bart-large/ \
    --per_device_train_batch_size 2 \
    --per_device_eval_batch_size 4 \
    --gradient_accumulation_steps 4 \
    --predict_with_generate \
    --evaluation_strategy epoch \
    --save_strategy epoch \
    --num_beams 4 \
    --source_lang tr_TR \
    --target_lang tr_TR \
    --forced_bos_token tr_TR \
    --max_target_length 64 \
    --max_source_length 496 \
    --num_train_epochs 10 \
    --load_best_model_at_end \
    --metric_for_best_model eval_rougeL \
    --learning_rate 5e-05 \
    --group_by_length \
    --report_to tensorboard \
    --label_smoothing_factor 0.1 \
    --fp16


python -m torch.distributed.launch --nnodes=1 --nproc_per_node=8 --node_rank=0 transformers/examples/pytorch/summarization/run_summarization.py  \
   --model_name_or_path "google/mt5-base" \
   --do_eval \
   --do_train \
   --do_predict \
   --dataset_name mlsum \
   --dataset_config "tu" \
   --output_dir ./eval-mt5-base-aggressive/ \
   --per_device_train_batch_size 2 \
   --per_device_eval_batch_size 4 \
   --gradient_accumulation_steps 4 \
   --predict_with_generate \
   --evaluation_strategy epoch \
   --save_strategy epoch \
   --num_beams 4 \
   --max_target_length 64 \
   --max_source_length 496 \
   --num_train_epochs 10 \
   --learning_rate 5e-04 \
   --load_best_model_at_end \
   --metric_for_best_model eval_rougeL \
   --group_by_length \
   --report_to tensorboard \
   --source_prefix "summarize: " \
   --label_smoothing_factor 0.1



python -m torch.distributed.launch --nnodes=1 --nproc_per_node=8 --node_rank=0 transformers/examples/pytorch/summarization/run_summarization.py  \
    --model_name_or_path "./turkish-bart-uncased" \
    --do_eval \
    --do_train \
    --do_predict \
    --dataset_name mlsum \
    --dataset_config "tu" \
    --output_dir ./eval-turkish-bart-uncased/ \
    --per_device_train_batch_size 4 \
    --per_device_eval_batch_size 8 \
    --gradient_accumulation_steps 2 \
    --predict_with_generate \
    --evaluation_strategy epoch \
    --save_strategy epoch \
    --num_beams 4 \
    --max_target_length 64 \
    --max_source_length 768 \
    --num_train_epochs 15 \
    --learning_rate 1e-4 \
    --load_best_model_at_end \
    --metric_for_best_model eval_rougeL \
    --group_by_length \
    --report_to tensorboard \
    --label_smoothing_factor 0.1 \
    --fp16

