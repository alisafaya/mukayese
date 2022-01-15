source ~/anaconda3/bin/activate a100
cd tr-translation

python -m torch.distributed.launch --nnodes=1 --nproc_per_node=8 --node_rank=0 transformers/examples/pytorch/translation/run_translation.py \
    --model_name_or_path "facebook/mbart-large-50-many-to-many-mmt" \
    --output_dir ./mbart50-scratch-wmt16-en-tr/ \
    --target_lang tr_TR \
    --source_lang en_XX \
    --dataset_name wmt16 \
    --dataset_config_name tr-en \
    --do_eval \
    --do_train \
    --do_predict \
    --per_device_train_batch_size 2 \
    --per_device_eval_batch_size 4 \
    --gradient_accumulation_steps 2 \
    --metric_for_best_model eval_bleu \
    --evaluation_strategy epoch \
    --save_strategy epoch \
    --overwrite_output_dir \
    --num_beams 4 \
    --learning_rate 5e-5 \
    --num_train_epochs 5 \
    --load_best_model_at_end \
    --group_by_length \
    --report_to tensorboard \
    --predict_with_generate \
    --fp16 

# mBART50

# {
#     "predict_bleu": 18.5456,
#     "predict_gen_len": 29.873,
#     "predict_loss": 1.8775715827941895,
#     "predict_runtime": 139.7065,
#     "predict_samples": 3000,
#     "predict_samples_per_second": 21.474,
#     "predict_steps_per_second": 0.673
# }

# Transformer

# Generate test with beam=5: BLEU4 = 15.72, 46.9/21.0/10.9/6.0 (BP=0.986, ratio=0.986, syslen=53668, reflen=54442)

# ConvS2S:

# Generate test with beam=5: BLEU4 = 12.78, 40.5/17.1/8.5/4.5 (BP=1.000, ratio=1.060, syslen=57697, reflen=54442)

python -m torch.distributed.launch --nnodes=1 --nproc_per_node=8 --node_rank=0 transformers/examples/pytorch/translation/run_translation.py \
    --model_name_or_path "facebook/mbart-large-50-many-to-many-mmt" \
    --output_dir ./mbart50-scratch-wmt16-tr-en/ \
    --source_lang tr_TR \
    --target_lang en_XX \
    --dataset_name wmt16 \
    --dataset_config_name tr-en \
    --do_eval \
    --do_train \
    --do_predict \
    --per_device_train_batch_size 2 \
    --per_device_eval_batch_size 4 \
    --gradient_accumulation_steps 2 \
    --metric_for_best_model eval_bleu \
    --evaluation_strategy epoch \
    --save_strategy epoch \
    --overwrite_output_dir \
    --num_beams 4 \
    --learning_rate 5e-5 \
    --num_train_epochs 5 \
    --load_best_model_at_end \
    --group_by_length \
    --report_to tensorboard \
    --predict_with_generate \
    --fp16 

# mBART50

# {
#     "predict_bleu": 24.1704,
#     "predict_gen_len": 28.8763,
#     "predict_loss": 1.4826797246932983,
#     "predict_runtime": 134.8473,
#     "predict_samples": 3000,
#     "predict_samples_per_second": 22.247,
#     "predict_steps_per_second": 0.697
# }

# Transformer

# Generate test with beam=5: BLEU4 = 17.29, 55.1/24.5/12.6/6.8 (BP=0.937, ratio=0.939, syslen=63533, reflen=67665)

# ConvS2S:

# Generate test with beam=5: BLEU4 = 13.22, 47.1/18.6/8.8/4.4 (BP=0.974, ratio=0.975, syslen=65946, reflen=67665)

python -m torch.distributed.launch --nnodes=1 --nproc_per_node=8 --node_rank=0 transformers/examples/pytorch/translation/run_translation.py \
    --model_name_or_path facebook/mbart-large-50-many-to-many-mmt \
    --source_lang en_XX \
    --target_lang tr_TR \
    --train_file mustc_dataset/train.json \
    --validation_file mustc_dataset/dev.json \     
    --test_file mustc_dataset/test.json \
    --output_dir ./mbart50-scratch-mustc-en-tr/ \
    --do_eval \
    --do_train \
    --do_predict \
    --per_device_train_batch_size 2 \
    --per_device_eval_batch_size 4 \
    --gradient_accumulation_steps 2 \
    --metric_for_best_model eval_bleu \
    --evaluation_strategy epoch \
    --save_strategy epoch \
    --overwrite_output_dir \
    --num_beams 4 \
    --learning_rate 5e-5 \
    --num_train_epochs 5 \
    --load_best_model_at_end \
    --group_by_length \
    --report_to tensorboard \
    --predict_with_generate \
    --fp16 

# {
#     "predict_bleu": 19.6192,
#     "predict_gen_len": 26.2159,
#     "predict_loss": 1.564680814743042,
#     "predict_runtime": 121.323,
#     "predict_samples": 2408,
#     "predict_samples_per_second": 19.848,
#     "predict_steps_per_second": 0.626
# }

# Transformer:

# Generate test with beam=5: BLEU4 = 15.52, 48.1/21.4/10.8/5.6 (BP=0.986, ratio=0.986, syslen=38801, reflen=39339)

# ConvS2S:

# Generate test with beam=5: BLEU4 = 13.33, 44.6/18.7/8.9/4.3 (BP=1.000, ratio=1.007, syslen=39617, reflen=39339)

python -m torch.distributed.launch --nnodes=1 --nproc_per_node=8 --node_rank=0 transformers/examples/pytorch/translation/run_translation.py \
    --model_name_or_path facebook/mbart-large-50-many-to-many-mmt \
    --source_lang tr_TR \
    --target_lang en_XX \
    --train_file mustc_dataset/train.json \
    --validation_file mustc_dataset/dev.json \     
    --test_file mustc_dataset/test.json \
    --output_dir ./mbart50-scratch-mustc-tr-en/ \
    --do_eval \
    --do_train \
    --do_predict \
    --per_device_train_batch_size 2 \
    --per_device_eval_batch_size 4 \
    --gradient_accumulation_steps 2 \
    --metric_for_best_model eval_bleu \
    --evaluation_strategy epoch \
    --save_strategy epoch \
    --overwrite_output_dir \
    --num_beams 4 \
    --learning_rate 5e-5 \
    --num_train_epochs 5 \
    --load_best_model_at_end \
    --group_by_length \
    --report_to tensorboard \
    --predict_with_generate \
    --fp16 
 
# {
#     "predict_bleu": 32.9791,
#     "predict_gen_len": 27.2841,
#     "predict_loss": 1.0771024227142334,
#     "predict_runtime": 125.3958,
#     "predict_samples": 2408,
#     "predict_samples_per_second": 19.203,
#     "predict_steps_per_second": 0.606
# }


# Transformer:

# Generate test with beam=5: BLEU4 = 27.01, 61.3/34.2/21.2/13.4 (BP=0.972, ratio=0.973, syslen=52587, reflen=54056)

# ConvS2S:

# Generate test with beam=5: BLEU4 = 21.79, 55.9/28.6/16.6/9.9 (BP=0.964, ratio=0.965, syslen=52141, reflen=54056)