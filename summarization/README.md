# Turkish News Summarization on ML-SUM dataset

There are overlapping 17 instances between test/validation/training sets, and 873 repetitions of other instances. We remove these 890 instances from the test set, and evaluate the models.

If you use huggingface/datasets to load the MLSUM dataset, the indices of the duplicates of the test set can be found here [duplicates_idx.json](./duplicates_idx.json).

First run `sh setup.sh` to clone the transformers repo. Then you can run the experiments as in [train_summarize.sh](./train_summarize.sh).

## MT5-Base model

```
Evaluation performance:

  epoch                   =       10.0
  eval_gen_len            =    53.3888
  eval_loss               =     2.8923
  eval_rouge1             =    46.6065
  eval_rouge2             =    34.0671
  eval_rougeL             =    41.1433
  eval_rougeLsum          =    43.0324
  eval_runtime            = 0:10:38.61
  eval_samples            =      11565
  eval_samples_per_second =      18.11
  eval_steps_per_second   =      0.567

Test results:

  predict_gen_len            =    52.8172
  predict_loss               =     2.9288
  predict_rouge1             =    44.4838
  predict_rouge2             =    31.2605
  predict_rougeL             =    38.6177
  predict_rougeLsum          =    40.5975
  predict_runtime            = 0:11:43.82
  predict_samples            =      12775
  predict_samples_per_second =     18.151
  predict_steps_per_second   =      0.568

Corrected test results:

{
    'rouge1': 43.01437184210638,
    'rouge2': 29.99789717059422,
    'rougeL': 37.36955848073739,
    'rougeLsum': 37.38184342979783,
    'meteor': 30.770022724242846
}
```

### Agressive training (5e-4)


```
Evaluation performance:

  eval_rouge1             =    47.4222
  eval_rouge2             =    34.8624
  eval_rougeL             =    42.2487
  eval_rougeLsum          =    43.9494

Test results:

  predict_rouge1             =    45.4725
  predict_rouge2             =    32.2159
  predict_rougeL             =    39.9207
  predict_rougeLsum          =    41.6933

Corrected test results:

{
    'rouge1': 44.13470054175642,
    'rouge2': 31.090646535393656,
    'rougeL': 38.76174444806983,
    'rougeLsum': 38.76084749049528,
    'meteor': 31.47075654406874
}
```

## MBart Large model (5e-5)

```
Evaluation performance:

  epoch                   =       10.0
  eval_gen_len            =    43.2426
  eval_loss               =     2.8386
  eval_rouge1             =    46.7011
  eval_rouge2             =    34.0087
  eval_rougeL             =    41.5475
  eval_rougeLsum          =    43.2108
  eval_runtime            = 0:08:55.18
  eval_samples            =      11565
  eval_samples_per_second =     21.609
  eval_steps_per_second   =      0.676

Test results: 

  predict_gen_len            =    42.5419
  predict_loss               =     2.8723
  predict_rouge1             =    44.7777
  predict_rouge2             =     31.459
  predict_rougeL             =    39.2153
  predict_rougeLsum          =    41.0241
  predict_runtime            = 0:09:51.96
  predict_samples            =      12775
  predict_samples_per_second =     21.581
  predict_steps_per_second   =      0.676

Corrected test results:

{
    'rouge1': 43.75200940273817,
    'rouge2': 30.607464799871643,
    'rougeL': 38.472691630665096,
    'rougeLsum': 38.48725692807311,
    'meteor': 30.36837756480873
}
```

## Turkish Bart Base model (5e-5) - Reinitialized

```

Evaluation performance:

    "eval_gen_len": 34.5978,
    "eval_loss": 3.4903244972229004,
    "eval_rouge1": 43.2049,
    "eval_rouge2": 30.7082,
    "eval_rougeL": 38.1981,
    "eval_rougeLsum": 39.9453,
    "eval_runtime": 174.6059,
    "eval_samples": 11565,
    "eval_samples_per_second": 66.235,
    "eval_steps_per_second": 1.037,

Test results: 

    "predict_gen_len": 34.3322,
    "predict_loss": 3.594130754470825,
    "predict_rouge1": 41.0379,
    "predict_rouge2": 27.8767,
    "predict_rougeL": 35.6325,
    "predict_rougeLsum": 37.4566,
    "predict_runtime": 193.3572,
    "predict_samples": 12775,
    "predict_samples_per_second": 66.069,
    "predict_steps_per_second": 1.034
{'meteor': 0.26471378834591874}


Corrected test results:

{
  'rouge1': 40.23480318632317,
  'rouge2': 27.23515517077749,
  'rougeL': 35.08601138805227,
  'rougeLsum': 35.076294629967764,
  'meteor': 25.81220135382564
}
```
