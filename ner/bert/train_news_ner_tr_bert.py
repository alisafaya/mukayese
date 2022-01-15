import torch, flair
from tqdm import tqdm
import sys

from flair.datasets import UniversalDependenciesCorpus, XTREME
from flair.embeddings import TransformerWordEmbeddings
from flair.models import SequenceTagger
from flair.trainers import ModelTrainer
from flair.data import Corpus
from flair.datasets import ColumnCorpus
from flair.data import Dictionary, Sentence, Label

from torch.optim.lr_scheduler import OneCycleLR

dataset_name = 'tur-ner-dataset'

# define columns
columns = {0: 'text', 1: 'ner'}

# this is the folder in which train, test and dev files reside
data_folder = sys.argv[1]

# init a corpus using column format, data folder and the names of the train, dev and test files
corpus: Corpus = ColumnCorpus(data_folder, columns,
                              train_file='train.txt',
                              test_file='test.txt',
                              dev_file='dev.txt')
    
hf_model = 'dbmdz/bert-base-turkish-cased'

embeddings = TransformerWordEmbeddings(
    model=hf_model,
    layers="-1",
    subtoken_pooling="first",
    fine_tune=True,
    use_context=False,
    respect_document_boundaries=False,
)

tag_type="ner"
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

output_folder = f"flert-{dataset_name}-{hf_model.replace('/', '.' ) }"

trainer = ModelTrainer(tagger, corpus, optimizer=torch.optim.AdamW)


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

with open('bert_news_ner_predictions.json', 'w') as f:
    json.dump(data, f)