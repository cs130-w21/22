import transformers

from cfg import config


def get_model():
	"""Gets a BERT classification model from the latest training checkpoint.

	Returns:
		transformers.DistilBertForSequenceClassification: a DistilBert model
	"""
	model = transformers.AutoModelForSequenceClassification.from_pretrained(config['model_checkpoint'], num_labels=2)
	return model
	

def get_pretrained_model(path='saved_models/checkpoint-1480'):
	"""Gets a BERT classification model from a given pretrained model checkpoint (supplied with a filepath).

	Args:
		path (str): a valid filepath that contains the checkpoint of a DistilBert model

	Returns:
		transformers.DistilBertForSequenceClassification: a DistilBert model
	"""
	model = transformers.AutoModelForSequenceClassification.from_pretrained(path)
	return model
