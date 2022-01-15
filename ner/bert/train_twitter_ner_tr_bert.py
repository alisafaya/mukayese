import torch, flair
from tqdm import tqdm

from flair.datasets import XTREME
from flair.embeddings import TransformerWordEmbeddings
from flair.models import SequenceTagger
from flair.trainers import ModelTrainer
from flair.data import Corpus
from flair.datasets import ColumnCorpus

from torch.optim.lr_scheduler import OneCycleLR

dataset_name = 'xtreme'
tag_type = "ner"
corpus = XTREME(languages="tr")

stats = corpus.obtain_statistics()
print(stats)

hf_model = 'dbmdz/bert-base-turkish-cased'

embeddings = TransformerWordEmbeddings(
    model=hf_model,
    layers="-1",
    subtoken_pooling="first",
    fine_tune=True,
    use_context=False,
    respect_document_boundaries=False,
)

tag_dictionary = corpus.make_tag_dictionary(tag_type)

tagger: SequenceTagger = SequenceTagger(
    hidden_size=256,
    embeddings=embeddings,
    tag_dictionary=tag_dictionary,
    tag_type=tag_type,
    use_crf=False,
    use_rnn=False,
    reproject_embeddings=False,
)

trainer = ModelTrainer(tagger, corpus, optimizer=torch.optim.AdamW)

output_folder = output_folder = f"flert-{dataset_name}-{hf_model.replace('/', '.' ) }"

trainer.train(
    output_folder,
    learning_rate=5.0e-5,
    mini_batch_size=16,
    mini_batch_chunk_size=1,
    max_epochs=20,
    scheduler=OneCycleLR,
    embeddings_storage_mode='none',
    weight_decay=0.,
    train_with_dev=False,
    anneal_with_restarts=True,
    save_model_at_each_epoch=True
)

tagger = SequenceTagger.load( output_folder + '/' + 'final-model.pt' )

def sent_to_label( sent ):
    predictions = []
    for t in sent.tokens:
        predictions.append( t.get_labels()[0].value )
        
    return predictions


all_predictions = []
for t in tqdm( corpus.test ):
    tagger.predict( t )
    predictions = sent_to_label( t )
    all_predictions.append( predictions )

import json

data = {}
data['predictions'] = all_predictions

with open('bert_twitter_ner_predictions.json', 'w') as f:
    json.dump(data, f)