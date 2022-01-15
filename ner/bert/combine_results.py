import json

f = open( 'bert_news_ner_predictions.json' )
data = json.load(f)
news_predictions = data['predictions']

f = open( 'bert_twitter_ner_predictions.json' )
data = json.load(f)
twitter_predictions = data['predictions']

all_predictions = {}
all_predictions['news'] = news_predictions

all_predictions['twitter'] = twitter_predictions

with open("bert_ner_all_predictions.json", "w") as outfile:
    json.dump(all_predictions, outfile)

