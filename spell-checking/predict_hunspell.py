
from hunspell import Hunspell

import sys
import json
import pandas as pd

from tqdm import tqdm, trange

if __name__ == '__main__':

    hun = Hunspell('tr_TR', hunspell_data_dir=sys.argv[1])
    df = pd.read_csv(sys.argv[2])

    spellings = {}
    for w, g in tqdm(zip(df['input'], df['gold'])):
        spellings[w] = { 'input': w, 'gold': str(g), 'spelling': int(not hun.spell(w)), 'suggestions': [] }

    batch_size = 1024
    for b in trange(0, len(df['input']), batch_size):
        try:
            suggestions = hun.bulk_suggest(list(set(df['input'].to_list()[b:b+batch_size])))
        except:
            print('Error')
            print(df['input'].to_list()[b:b+batch_size])

        for w in suggestions:
            spellings[w]['suggestions'] = suggestions[w]

    with open(sys.argv[3], 'w') as f:
        for w in spellings:
            f.write(json.dumps(spellings[w], ensure_ascii=False) + '\n')
