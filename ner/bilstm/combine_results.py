import json

f = open( 'news-ner-bilstm-crf/bilstm-news-ner-predictions.json' )
data = json.load(f)
news_predictions = data['predictions']

f = open( 'twitter-ner-bilstm-crf/bilstm-twitter-ner-predictions.json' )
data = json.load(f)
twitter_predictions = data['predictions']

all_predictions = {}
all_predictions['news'] = news_predictions

all_predictions['twitter'] = twitter_predictions

with open("bilstm_ner_all_predictions.json", "w") as outfile:
    json.dump(all_predictions, outfile)

