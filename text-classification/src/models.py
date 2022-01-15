# adapted from https://mlwhiz.com/blog/2019/03/09/deeplearning_architectures_text_classification/
from torch import nn
import torch.nn.functional as F
import torch


class CNN_Text(nn.Module):
    def __init__(self, n_labels, max_features, embed_size=256):
        super(CNN_Text, self).__init__()
        
        filter_sizes = [1,2,3,5]
        num_filters = 36
        self.n_labels = n_labels

        self.embedding = nn.Embedding(max_features, embed_size, padding_idx=0)
        self.convs1 = nn.ModuleList([nn.Conv2d(1, num_filters, (K, embed_size)) for K in filter_sizes])
        self.dropout = nn.Dropout(0.1)
        self.fc1 = nn.Linear(len(filter_sizes) * num_filters, n_labels)

    def forward(self, input_ids, attention_mask=None, token_type_ids=None, labels=None):
        x = self.embedding(input_ids)
        x = [F.relu(conv(x.unsqueeze(1))).squeeze(3) for conv in self.convs1] 
        x = [F.max_pool1d(i, i.size(2)).squeeze(2) for i in x]  
        x = torch.cat(x, 1)
        x = self.dropout(x)  
        logits = self.fc1(x)

        if labels is not None:
            loss_fct = nn.CrossEntropyLoss()
            loss = loss_fct(logits.view(-1, self.n_labels), labels.view(-1))
            return (loss, logits)

        return (logits,)


class BiLSTM(nn.Module):
    
    def __init__(self, n_labels, max_features, embed_size=256):
        super(BiLSTM, self).__init__()
        drp = 0.1
        self.hidden_size = 256
        self.n_labels = n_labels
        self.embedding = nn.Embedding(max_features, embed_size, padding_idx=0)
        self.lstm = nn.LSTM(embed_size, self.hidden_size, bidirectional=True, batch_first=True)
        self.linear = nn.Linear(self.hidden_size*4 , 256)
        self.relu = nn.ReLU()
        self.dropout = nn.Dropout(drp)
        self.out = nn.Linear(256, n_labels)

    def forward(self, input_ids, attention_mask=None, token_type_ids=None, labels=None):
        h_embedding = self.embedding(input_ids)
        h_embedding = torch.squeeze(torch.unsqueeze(h_embedding, 0))
        h_lstm, _ = self.lstm(h_embedding)
        avg_pool = torch.mean(h_lstm, 1)
        max_pool, _ = torch.max(h_lstm, 1)
        conc = torch.cat(( avg_pool, max_pool), 1)
        conc = self.relu(self.linear(conc))
        conc = self.dropout(conc)
        logits = self.out(conc)

        if labels is not None:
            loss_fct = nn.CrossEntropyLoss()
            loss = loss_fct(logits.view(-1, self.n_labels), labels.view(-1))
            return (loss, logits)

        return (logits,)
