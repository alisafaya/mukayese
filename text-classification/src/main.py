
from datasets import load_dataset
from sklearn.metrics import classification_report, f1_score

from transformers import *
from torch.utils.data import TensorDataset, DataLoader, RandomSampler, SequentialSampler
from torch import nn
from torch import optim

import time
import torch
import json
import os

from models import BiLSTM, CNN_Text

def get_dataloader(tokenizer, text, labels=None, max_length=256, shuffle=False, batch_size=32):

    tokenized_dict = tokenizer([ t.lower() for t in text], padding=True, truncation=True, max_length=max_length, return_tensors='pt')

    data = TensorDataset(*tuple(tokenized_dict.values())) if labels is None else TensorDataset(*tuple(tokenized_dict.values()), torch.tensor(labels))
    sampler = RandomSampler(data) if shuffle else SequentialSampler(data)
    dataloader = DataLoader(data, sampler=sampler, batch_size=batch_size)

    return dataloader


def predict(model, tokenizer, x_test, batch_size=32, max_length=512, device=torch.device('cpu')):

    test_dataloader = get_dataloader(tokenizer, x_test, batch_size=batch_size, max_length=max_length, shuffle=False)
    model.eval()
    
    predictions = []
    with torch.no_grad(): 
        for batch in test_dataloader:
            ids, token_type_ids, attention_mask = tuple(t.to(device) for t in batch)
            logits = model(ids, token_type_ids=token_type_ids, attention_mask=attention_mask)[0]
            labels = torch.argmax(logits, dim=1).detach().cpu()
            predictions += labels.tolist()

    return predictions


def train_auto(x_train, x_dev, y_train, y_dev, model, tokenizer, max_length=256, n_epochs=10, model_path="temp.pt", batch_size=32, device=torch.device('cpu'), seed=1234):

    # Create the DataLoader for training set.
    train_dataloader = get_dataloader(tokenizer, x_train, labels=y_train, batch_size=batch_size, max_length=max_length, shuffle=True)

    # Create the DataLoader for dev set.
    dev_dataloader = get_dataloader(tokenizer, x_dev, labels=y_dev, batch_size=batch_size, max_length=max_length)

    model.to(device)
    torch.manual_seed(seed)
    if device.type == "cuda":
        torch.cuda.manual_seed_all(seed)

    total_steps = len(train_dataloader) * n_epochs
    optimizer = AdamW(model.parameters(), lr=lr)
    scheduler = get_linear_schedule_with_warmup(optimizer, 
                                        num_warmup_steps = 0,
                                        num_training_steps = total_steps)

    model.zero_grad()
    best_score = 0
    for epoch in range(n_epochs):

        start_time = time.time()
        model.train()

        train_preds, train_labels, train_loss = [], [], 0
        for batch in train_dataloader:
            ids, token_type_ids, attention_mask, labels = tuple(t.to(device) for t in batch)
            output = model(ids, token_type_ids=token_type_ids, attention_mask=attention_mask, labels=labels)
            output[0].backward()

            torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0) # gradient clipping

            optimizer.step()
            scheduler.step()

            train_loss += output[0].item()
            train_preds += torch.argmax(output[1], dim=1).detach().cpu().tolist()
            train_labels += labels.detach().cpu().tolist()

            model.zero_grad()

        train_loss /= len(train_dataloader)
        train_score = f1_score(train_labels, train_preds, average="macro")

        model.eval()
        val_preds, val_loss = [], 0
        with torch.no_grad():
            for batch in dev_dataloader:
                ids, token_type_ids, attention_mask, labels = tuple(t.to(device) for t in batch)
                output = model(ids, token_type_ids=token_type_ids, attention_mask=attention_mask, labels=labels)
                val_loss += output[0].item()
                val_preds += torch.argmax(output[1], dim=1).detach().cpu().tolist()
                model.zero_grad()

        val_loss /= len(dev_dataloader)
        val_score = f1_score(y_dev, val_preds, average="macro")
        elapsed = time.time() - start_time
        print("Epoch %d Train loss: %.4f. Train Macro F1-Score: %.4f, Dev Macro F1-Score: %.4f  Dev loss: %.4f. Elapsed time: %.2fs."% (epoch + 1, train_loss, train_score, val_score, val_loss, elapsed))
        if val_score > best_score:
            best_score = val_score
            torch.save(model.state_dict(), model_path)

    model.load_state_dict(torch.load(model_path))
    model.to(device)
    model.predict = predict.__get__(model)
    os.remove(model_path)

    return model


def evaluate(dataset_path, batch_size=32, max_length=512, device=torch.device('cpu')):

    print("-"*80)
    print("Loading dataset...", dataset_path)
    print("-"*80)

    dataset = load_dataset('json', data_files={'train': os.path.join(dataset_path, 'train.json'), 'val': os.path.join(dataset_path, 'val.json'), 'test': os.path.join(dataset_path, 'test.json')})
    label_map = { label : i for i, label in enumerate(set(dataset['train']['label'])) } 

    print(json.dumps(label_map, indent=2))

    x_train, y_train = (dataset['train']['text'], [label_map[label] for label in dataset['train']['label']])
    x_dev, y_dev = (dataset['val']['text'], [label_map[label] for label in dataset['val']['label']])
    x_test, y_test = (dataset['test']['text'], [label_map[label] for label in dataset['test']['label']])

    # load the pretrained model and tokenizer.
    pretrained_model = "dbmdz/bert-base-turkish-cased"
    tokenizer = AutoTokenizer.from_pretrained(pretrained_model)

    model_1 = AutoModelForSequenceClassification.from_pretrained(pretrained_model, num_labels=len(label_map))
    model_2 = BiLSTM(len(label_map), tokenizer.vocab_size)
    model_3 = CNN_Text(len(label_map), tokenizer.vocab_size)

    for model in [model_1, model_2, model_3]:

        print("-"*80)
        print(model.__class__.__name__)
        print("-"*80)

        # training
        model = train_auto(x_train, x_dev, y_train, y_dev, model, tokenizer, max_length=max_length, n_epochs=n_epochs, batch_size=batch_size, device=device)
        lr = 3e-5 if model.__class__.__name__ == "AutoModelForSequenceClassification" else 1e-3

        # testing
        predictions = model.predict(tokenizer, x_test, batch_size=batch_size, max_length=max_length, device=device)
        print ('Test data\n', classification_report(y_test, predictions, digits=3))


if __name__ == "__main__":
    
    use_gpu = True
    lr = 1e-3

    if use_gpu and torch.cuda.is_available():
        device = torch.device("cuda")
    else:
        device = torch.device("cpu")

    for dataset in ("offenseval", "news-cat"):

        max_length = 512 if dataset == "news-cat" else 128
        batch_size = 32
        n_epochs = 15

        evaluate(f"datasets/{dataset}", batch_size=batch_size, max_length=max_length, device=device)
