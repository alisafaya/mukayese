# Sentence Level Tokenization

This folder contains information about the created dataset and the trained models for the Sentence Tokenization task for our Turkish Natural Language Processing benchmarking platform Mukayese.

### Download datasets

Download and extract data from the v1.0 release of [mukayese-datasets](https://github.com/mukayese-nlp/mukayese-datasets/releases/tag/v1.0):

```shell
mv /your/download/path/trseg-41.zip .
unzip trseg-41.zip
```
### Dataset Format

All the documents are formatted as follows:

```json
    {"text": "Türkiye'de sosyolojinin 100 yılı aşkın tarihinin genel bir değerlendirmesini amaçlayan bu yazıda , önce ' dünya mirası ' kısaca değerlendirilmekte ve ardından da sosyolojinin Osmanlı'da ilk tanınmaya başlandığı dönemde kazandığı genel özellikler üzerinde durulmaktadır . Ardından da sosyolojinin Cumhuriyet dönemindeki serüveni kürsüler , sosyologlar , sosyolojik araştırma alanları ve eğilimler dikkate alınarak sunulmakta ve sosyolojinin bugün geldiği duruma ilişkin genel bir muhasebe yapılmaktadır .", 
    "sentences": ["Türkiye'de sosyolojinin 100 yılı aşkın tarihinin genel bir değerlendirmesini amaçlayan bu yazıda , önce ' dünya mirası ' kısaca değerlendirilmekte ve ardından da sosyolojinin Osmanlı'da ilk tanınmaya başlandığı dönemde kazandığı genel özellikler üzerinde durulmaktadır .", "Ardından da sosyolojinin Cumhuriyet dönemindeki serüveni kürsüler , sosyologlar , sosyolojik araştırma alanları ve eğilimler dikkate alınarak sunulmakta ve sosyolojinin bugün geldiği duruma ilişkin genel bir muhasebe yapılmaktadır ."]}
```

### Baseline Model

The baseline model is chosen as the Punkt tokenizer from [NLTK library](https://www.nltk.org/index) and trained with the development split of our trseg-41 dataset.

#### Using the Pretrained Model

```python
from nltk.tokenize.punkt import PunktSentenceTokenizer, PunktTrainer
import json

datapath="path/to/data"
objectpath = "mukayese-punkt/mukayese_punkt_clean.pkl"
vals = []
with open(path) as data:
    for line in data:
        vals.append(json.loads(line))

tokenizer = pickle.load(open(objectpath, "rb"))

for line in vals:
    print(tokenizer.tokenize(line["sentences"]))
```
