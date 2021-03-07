import numpy as np

from sklearn.metrics import f1_score, \
							roc_auc_score, \
							matthews_corrcoef, \
							accuracy_score, \
							confusion_matrix, \
							precision_score, \
							recall_score


def metrics(eval_pred):
	"""Returns a set of metrics (accuracy, F1 score, ROC AOC, precision, recall) based on predictions and target labels.

	Args:
		eval_pred (list, list): a tuple of (predictions, labels), each being a list

	Returns:
		dict: A dictionary with keys corresponding to the values of accuracy, f1, roc_aoc, precision, and recall
	"""
	predictions, labels = eval_pred
	predictions = np.argmax(predictions, axis=1)
	accuracy = accuracy_score(labels, predictions)
	f1 = f1_score(labels, predictions)
	roc_aoc = roc_auc_score(labels, predictions)
	prec = precision_score(labels, predictions)
	recall = recall_score(labels, predictions)
	return {'accuracy':accuracy, 'f1':f1, 'roc_aoc':roc_aoc, 'precision':prec, 'recall':recall}
