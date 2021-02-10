import transformers

from cfg import config


def get_model():
  model = transformers.AutoModelForSequenceClassification.from_pretrained(config['model_checkpoint'], num_labels=2)
  return model
