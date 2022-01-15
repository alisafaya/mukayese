from nltk.tokenize.punkt import PunktSentenceTokenizer, PunktTrainer
import pickle
import json
import re
import os
from spacy.lang.tr import Turkish
from spacy.tokens import Doc
from spacy.training import Example
import numpy as np
import argparse
import glob
from spacy.scorer import Scorer

nlp = Turkish()
url_subtitude = """((http|https)\:\/\/)?[a-zA-Z0-9\.\/\?\:@\-_=#]+\.([a-zA-Z]){2,6}([a-zA-Z0-9\.\&\/\?\:@\-_=#])*"""
scorer = Scorer()

def evaluate_punkt(tokenizer, test_set):
    examples = []
    for i in test_set:
        predicted, reference = tokenizer.tokenize(test_set["text"]), test_set["sentences"]
        predicted, reference = [Doc(nlp.vocab, words=i, spaces=np.ones(len(i), dtype=bool)) for i in [predicted, reference]]
        examples.append(Example(predicted, reference))
    return Scorer.score_tokenization(examples)
    

def preprocess_tweets(tweets):
    return [re.sub(tweets, "some.url", re.sub("@\w+", "@user", i)) for i in tweets]

def read_data(train_file, test_file, batch=False):
    train_set,test_set = [], []
    
    if os.path.isdir(train_file):
        for f in glob.glob(os.path.join(train_file,"*")):
            file = []
            for line in open(f):
                file.append(json.loads(line))
            train_set.append(file)
    
    for line in open(test_set):
        test_set.append(json.loads(line))
    
    return train_set, test_set


def write_outputs(tokenizer, sentences, out_file):
    with open(out_file) as data:
        for i in sentences:
            data.write(json.dumps({"text" : i, "sentences" : tokenizer.tokenize(i)}, ensure_ascii=False) + "\n")

            
def train_punkt(text, trainer, batch=None, freq=False, out_file=None, finalize_training=False, verbose=False):
    if not batch:
        trainer.train(text, verbose=verbose)
    else:
        for i in range(0, len(text), batch):
            trainer.train(text[i:i+batch_size], verbose=verbose)
            if freq:
                trainer.freq_threshold()
        if finalize_training:
            trainer.finalize_training()
            tokenizer = PunktSentenceTokenizer(trainer.get_params())
            out_file = "punkt_tokenizer.pkl" if out_file is None else out_file
            pickle.dump(tokenizer, open(out_file, "wb"))
            return tokenizer
        else:
            out_file = "punkt_checkpoint.pkl" if out_file is None else out_file
            pickle.dump(trainer, open(out_file, "wb"))

def join_sentences(x):
    return re.sub("( [,.;\)]|[\(] | ['] | [-] | [:])", lambda m: m.group(1).strip(), " ".join(x))

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Train NLTK Punkt Tokenizer")
    
    # Train Settings
    parser.add_argument("--train-path", help="""path to training file. If training is done with a single file, a .jsonl file in the following format is expected: {"text" : ..., "sentences" : ...}
    Else, this path should be a directory containing .jsonl files as described. """)
    parser.add_argument("--test-path", help="""path to training file. If training is done with a single file, a .jsonl file in the following format is expected: {"text" : ..., "sentences" : ...}
    Else, this path should be a directory containing .jsonl files as described. """)
    
    parser.add_argument("--freq-threshold", action="store_true")
    parser.add_argument("--finalize-training", action="store_true")
    parser.add_argument("--verbose", action="store_true")
    parser.add_argument("--batch", action="store_true")
    
    parser.add_argument("--out-file")
    parser.add_argument("--load-from")
    
    # Test Settings
    parser.add_argument("--evaluation_path", help='a single file, a .jsonl file in the following format is expected: {"text" : ..., "sentences" : ...}')
    parser.add_argument("--write_eval")
    args = parser.parse_args()
    
    if args.train_path:
        train_set, test_set = read_data(args.train_path, args.test_path, batch=args.batch)
        text = join_sentences([join_sentences(i["sentences"]) for i in train_set])
        if args.load_from:
            trainer = pickle.load(args.load_from)
        tokenizer = train_punkt(text, trainer, batch=args.batch, freq=args.freq, out_file=args.out_file, 
                                finalize_training=args.finalize_training, verbose=args.verbose)
        train_evaluation = evaluate_punkt(tokenizer, train_set) 
        test_evaluation = evaluate_punkt(tokenizer, test_set)
        print("Training Set Evaluation : ", train_evaluation)
        print("Test Set Evaluation : ", test_evaluation)
    elif args.evaluation_path:
        tokenizer = pickle.load(args.load_from)
        sentences = [json.loads(i) for i in open(args.evaluation_path)]
        evaluation = evaluate_punkt(tokenizer, sentences)
        write_outputs(tokenizer, evaluation, args.write_eval)
        