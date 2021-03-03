import numpy as np
import transformers
from transformers import pipeline

from data import get_tokenizer, InferenceDataset
from models import get_pretrained_model

from io import StringIO
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.pdfpage import PDFPage
from pdfminer.pdfparser import PDFParser
# Uses pdfminer.six to parse through the pdf. Example can be found at
# https://pdfminersix.readthedocs.io/en/latest/tutorial/composable.html

# Trims any beginning non-alphabet letters
def trim(string:str):
    index = 0
    for i in range(len(string)):
      if string[i].isalpha():
        break
      index = index + 1
    return string[index:]

# Processes text to better fit inference's expected value
def processText(text):
    text = text.strip()
    textList = text.split('\n')
    newText = ''
    addNewline = True
    for line in textList:
      # Remove duplicate white space
      temp = ' '.join(line.split())
      # Trim any beginning non-alphabet letters
      temp = trim(temp)
      # Remove overly short lines, but keep ends of sentences
      # Add a newline if gap detected
      if len(temp) < 40 and not '.' in temp:
        if addNewline:
          newText += '\n'
          addNewline = False
        continue
      # Add line to growing string
      newText += temp + ' '
      addNewline = True
    return newText
  

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
    if pdf == None and text != None:
      self.text = processText(text)
      return
    elif pdf == None and text == None:
      raise Exception('EULA initialization failed')

    output_string = StringIO()
    readFile = open(pdf, 'rb')
    with readFile as in_file:
      parser = PDFParser(in_file)
      doc = PDFDocument(parser)
      rsrcmgr = PDFResourceManager()
      device = TextConverter(rsrcmgr, output_string, laparams=LAParams())
      interpreter = PDFPageInterpreter(rsrcmgr, device)
      for page in PDFPage.create_pages(doc):
        interpreter.process_page(page)
    readFile.close()

    self.text = processText(output_string.getvalue())

  def getText(self):
    return self.text


