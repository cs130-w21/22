from flask import Flask, jsonify, request
#import inference.py
import os
import urllib.request

UPLOAD_FOLDER = '/tmp'
app = Flask(__name__)
app.config["DEBUG"] = True
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

###############################
# TODO Relocate code to inference.py

from io import StringIO

from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.pdfpage import PDFPage
from pdfminer.pdfparser import PDFParser

# Uses tutorial from pdfminer.six documentation
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
    #text = strObj.getvalue()
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

# Takes the file path and returns the pdf's text after processing
def convert_pdf(filepath):
    output_string = StringIO()
    readFile = open(filepath, 'rb')
    with readFile as in_file:
        parser = PDFParser(in_file)
        doc = PDFDocument(parser)
        rsrcmgr = PDFResourceManager()
        device = TextConverter(rsrcmgr, output_string, laparams=LAParams())
        interpreter = PDFPageInterpreter(rsrcmgr, device)
        for page in PDFPage.create_pages(doc):
            interpreter.process_page(page)
    readFile.close()

    return processText(output_string.getvalue())

#############################

@app.route('/pdf', methods=['POST'])
def analyzePdf():
    # Check if file exists
    if 'file' not in request.files:
        return jsonify({'result':'None', 'error':'Files not included in Request.'})
    
    uploaded_file = request.files['file']
    filename = uploaded_file.filename

    # Check if file has a name
    if filename == '':
        return jsonify({'result':'None', 'error':'File either has no name or no file uploaded.'})

    # Check if file extension is .pdf
    if filename.rsplit('.', 1)[1].lower() != 'pdf':
        return jsonify({'result':'None', 'error':'File must have file extension .pdf'})

    # Save file
    uploaded_file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    
    # Read/Convert file
    path = UPLOAD_FOLDER + '/' + filename
    text = convert_pdf(path)

    # Run inference
    # TODO: Create proper classes and run inference
    
    # Delete file
    os.remove(UPLOAD_FOLDER + '/' + filename)

    # Format return message
    # TODO: Properly format the 
    msg = text[0:50]
    ret_value = jsonify({'result':msg, 'error':'None'})

    return ret_value

@app.route('/text', methods=['POST'])
def analyzeText():
    if 'text' not in request.form:
        return jsonify({'result':'None', 'error':'Text not included in request.'})

    text = request.form['text']
    
    if not isinstance(text, str):
        return jsonify({'result':'None', 'error':'Data in incorrect format'})
    elif text == '':
        return jsonify({'result':'None', 'error':'No text received'})

    # Process the text
    text = processText(text)

    # Run inference
    # TODO

    # Format return message
    # TODO
    
    return jsonify({'result':request.form['text'], 'error':'None'})

if __name__ == '__main__':
    app.run()
