import torch
import transformers

from cfg import config
from data import get_train_val_test_datasets
from models import get_model
from utils import metrics


if __name__ == '__main__':

	args = transformers.TrainingArguments(
		"saved_models",
		evaluation_strategy = "epoch",
		learning_rate=config['learning_rate'],
		per_device_train_batch_size=config['batch_size'],
		per_device_eval_batch_size=config['batch_size'],
		num_train_epochs=config['num_epochs'],
		weight_decay=config['weight_decay'],
		load_best_model_at_end=True,
		metric_for_best_model="f1"
	)

	train, val, test = get_train_val_test_datasets()
	trainer = transformers.Trainer(model=get_model(), args=args, train_dataset=train, eval_dataset=val, compute_metrics=metrics)

	# Train the model.
	trainer.train()

	# Display model eval statistics.
	print(trainer.evaluate())

	# Test dataset metrics.
	trainer.predict(test).metrics
