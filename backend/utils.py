import numpy as np
from sklearn.metrics import f1_score, roc_auc_score, matthews_corrcoef, accuracy_score, confusion_matrix, precision_score, recall_score


def metrics(eval_pred):
  predictions, labels = eval_pred
  predictions = np.argmax(predictions, axis=1)
  accuracy = accuracy_score(labels, predictions)
  f1 = f1_score(labels, predictions)
  roc_aoc = roc_auc_score(labels, predictions)
  prec = precision_score(labels, predictions)
  recall = recall_score(labels, predictions)
  return {'accuracy':accuracy, 'f1':f1, 'roc_aoc':roc_aoc, 'precision':prec, 'recall':recall}


# takes EULA string and returns a list of clauses.
def getClauses(eula_str):
  clauses = eula_str.split('\n')
  nonempty_clauses = list(filter(lambda x : x != '', clauses))
  return nonempty_clauses

# not sure about this
def classify(eula_str, model):
  clauses = getClauses(eula_str)
  bad_clauses = []
  score = 0  # Acceptable
  for clause in clauses:
    if model.predict(clause) == 1:
      score = 1
      bad_clauses.append(clause)
  return score, bad_clauses
