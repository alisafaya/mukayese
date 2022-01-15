from sklearn.metrics import f1_score, recall_score, precision_score

import argparse
import json

def evaluate(input, gold, suggestions, spellings):
    """
        input:  list[str] (input list of words)
        gold:   list[str] (gold list of words)
        suggestions:  list[list[str]] (list of list of suggestions for each word)
        spellings:  list[int] (list of ints, 0 if the input is spelled correctly and 1 otherwise)
    """
    true, accurate, no_suggestions = [], 0, 0
    
    for i, g, s, spell in zip(input, gold, suggestions, spellings):
        
        if i == g:
            true.append(0)
        else:
            true.append(1)
    
            if spell: # if the spelling is wrong according to the model then we evaluate the accuracy of the correct suggestion
                accurate += int(g in s)
                no_suggestions += 1 if g == "nan" else 0

    f1 = f1_score(true, spellings)
    r  = recall_score(true, spellings)
    p  = precision_score(true, spellings)

    return p, r, f1, accurate / (sum(true) - no_suggestions)

def load_file(path):
    with open(path) as fi:
        objs = [ json.loads(l) for l in fi ]
    inputs = [ x["input"] for x in objs ]
    gold = [ x["gold"] for x in objs ]
    spellings = [ x["spelling"] for x in objs ]
    suggestions = [ x["suggestions"] for x in objs ]
    return inputs, gold, suggestions, spellings

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("--input-file", type=str, required=True)
    args = parser.parse_args()
    
    p, r, f1, acc = evaluate(*load_file(args.input_file))
    print(f"Error Detection Scores:\n\tPrecision = {p*100:3.2f}\n\tRecall = {r * 100:3.2f}\n\tF1-Score = {f1 * 100:3.2f}\n\nError Correction Accuracy = {acc*100:3.2f}")