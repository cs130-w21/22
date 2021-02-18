import numpy as np
import transformers

from data import get_tokenizer, InferenceDataset
from models import get_pretrained_model


class Inference():
  def __init__(self):
    # self.model = get_pretrained_model()
    self.tokenizer = get_tokenizer()
    self.model = transformers.Trainer(model=get_pretrained_model())

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


class EULA:
  def __init__(self, text, pdf=None):
    raise NotImplementedError

  def getText(self):
    raise NotImplementedError
