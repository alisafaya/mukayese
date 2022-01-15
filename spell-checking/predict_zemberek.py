from zemberek import (
    TurkishSpellChecker,
    TurkishMorphology,
)

import sys
import json
import pandas as pd

from tqdm import tqdm

morphology = TurkishMorphology.create_with_defaults()
sc = TurkishSpellChecker(morphology)

if __name__ == '__main__':

    df = pd.read_csv(sys.argv[1])

    spellings = {}
    for w, g in tqdm(zip(df['input'], df['gold'])):
        sugg = sc.suggest_for_word(w)
        spellings[w] = { 'input': w, 'gold': str(g), 'spelling': int(w not in sugg), 'suggestions': sugg }

    with open(sys.argv[2], 'w') as f:
        for w in spellings:
            f.write(json.dumps(spellings[w], ensure_ascii=False) + '\n')

