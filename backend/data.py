import numpy as np
import pandas as pd
import torch
from torch.utils.data import Dataset
import transformers

from cfg import config


class EULADataset(Dataset):
    def __init__(self, text, labels, tokenizer):
      self.encodings = tokenizer(text, truncation=True, padding=True)
      self.labels = labels

    def __getitem__(self, idx):
      item = {key: torch.tensor(val[idx]) for key, val in self.encodings.items()}
      item['labels'] = torch.tensor(self.labels[idx])
      return item

    def __len__(self):
      return len(self.labels)


def get_train_val_test_datasets():
  # Read EULA training data.
  df = pd.read_csv("data/AI_ML_Challenge_Training_Data_Set_1_v1.csv")

  # Split dataset into training, validation, and testing sets.
  rand_seed = 0
  train, val, test = np.split(df.sample(frac=1, random_state=rand_seed), [int(.8*len(df)), int(.9*len(df))])

  # TODO: For now, this undersamples training data to balance classes. Look into fancier methods to solve this.
  unacceptable = train.loc[train['Classification'] == 1]
  acceptable = train.loc[train['Classification'] == 0].sample(n=len(unacceptable), random_state=rand_seed)
  train = pd.concat([acceptable, unacceptable]).sample(frac=1, random_state=rand_seed)

  train_text, train_labels = (list(train['Clause Text']), list(train['Classification']))
  val_text, val_labels = (list(val['Clause Text']), list(val['Classification']))
  test_text, test_labels = (list(test['Clause Text']), list(test['Classification']))

  tokenizer = transformers.DistilBertTokenizerFast.from_pretrained(config['model_checkpoint'])
  trainset  = EULADataset(train_text, train_labels, tokenizer)
  valset    = EULADataset(val_text, val_labels, tokenizer)
  testset   = EULADataset(test_text, test_labels, tokenizer)

  return trainset, valset, testset
