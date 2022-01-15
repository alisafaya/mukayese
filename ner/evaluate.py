from datasets import load_metric
import sys
import json
import pprint

metric = load_metric("seqeval")
arg1, arg2 = sys.argv[1:]

references = [ [ x.split()[-1] for x in y.splitlines() ] for y in open(arg1).read().split("\n\n") ]
predictions = json.load(open(arg2))['predictions']

pprint.pprint(metric.compute(predictions=predictions, references=references))