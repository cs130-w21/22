import transformers

from cfg import config


def get_model():
  model = transformers.AutoModelForSequenceClassification.from_pretrained(config['model_checkpoint'], num_labels=2)
  return model

def get_pretrained_model(path='saved_models/checkpoint-1480'):
  model = transformers.AutoModelForSequenceClassification.from_pretrained(path)
  return model
