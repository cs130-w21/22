import numpy as np
import transformers
from transformers import pipeline

from data import get_tokenizer, InferenceDataset
from models import get_pretrained_model


class Inference():
  def __init__(self):
    # self.model = get_pretrained_model()
    self.tokenizer = get_tokenizer()
    self.model = transformers.Trainer(model=get_pretrained_model())
    self.summarizer = pipeline("summarization") # ~1.2 GB download the first time this is run.

  def getEthicalityClassification(self, e):
    text = e.getText()  # EULA clauses separated by newlines.
    clauses = text.split('\n')
    inference_data = InferenceDataset(clauses, self.tokenizer)
    predictions = self.model.predict(inference_data).predictions
    predictions = np.argmax(predictions, axis=1)

    # `predictions` is a 1d np array. For each clause, it is 0 for ethical and 1 for unethical.
    if predictions.sum() >= 1:
      return 'unethical'
    else:
      return 'ethical'

  def getEULASummary(self, e):
    text = e.getText()  # EULA clauses separated by newlines.
    summary = summarizer(text, min_length=10, max_length=10 + min(140, len(text) // 3))
    return summary[0]['summary_text']


class EULA:
  def __init__(self, text, pdf=None):
    raise NotImplementedError

  def getText(self):
    raise NotImplementedError
