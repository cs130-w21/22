from flask import Flask, jsonify, request
import inference
import os
import urllib.request
import json
import time # temp

UPLOAD_FOLDER = '/tmp'
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/pdf', methods=['POST'])
def analyzePdf():
    """Handler to analyze (classify and summarize) a EULA PDF input.
    
    Returns:
        flask.Response: a JSON response containing classification, summarization, and error information

    """
    # Check if file exist
    if 'file' not in request.files:
        return jsonify({'classification':'None', 'summary':'None', 'error':'Files not included in Request.'})
    
    uploaded_file = request.files['file']
    filename = uploaded_file.filename

    # Check if file has a name
    if filename == '':
        return jsonify({'classification':'None', 'summary':'None', 'error':'File either has no name or no file uploaded.'})

    # Check if file extension is .pdf
    if filename.rsplit('.', 1)[1].lower() != 'pdf':
        return jsonify({'classification':'None', 'summary':'None', 'error':'File must have file extension .pdf'})

    # Save file
    uploaded_file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    
    # Read/Convert file
    path = UPLOAD_FOLDER + '/' + filename
    #text = convert_pdf(path)

    # Create EULA class and run inference
    eula = inference.EULA(None, path)
    infer = inference.Inference()
    classification = infer.get_ethicality_classification(eula)
    summary = infer.get_EULA_summary(eula)
    
    # Delete file
    os.remove(UPLOAD_FOLDER + '/' + filename)

    # Format return message
    return jsonify({'classification':classification, 'summary':summary, 'error':'None'})


@app.route('/text', methods=['POST'])
def analyzeText():
    """Handler to analyze (classify and summarize) a EULA text input.
    
    Returns:
        flask.Response: a JSON response containing classification, summarization, and error information

    """
    request_data = request.get_json()
    print(request_data)

    if 'text' not in request_data:
        return jsonify({'classification':'None', 'summary':'None', 'error':'Text not included in request.'})

    text = request_data['text']
    
    if not isinstance(text, str):
        return jsonify({'classification':'None', 'summary':'None', 'error':'Data in incorrect format'})
    elif text == '':
        return jsonify({'classification':'None', 'summary':'None', 'error':'No text received'})

    # Create EULA class and run inference
    eula = inference.EULA(text, None)
    infer = inference.Inference()
    classification = infer.get_ethicality_classification(eula)
    summary = infer.get_EULA_summary(eula)

    # Format return message    
    return jsonify({'classification':classification, 'summary':summary, 'error':'None'})


@app.route('/text_dummy', methods=['POST'])
def analyzeTextDummy():
	# For testing frontend
	time.sleep(3)
	return jsonify({'classification':'ethical', 'summary':'Dummy text dummmy text dummmy text dummmy text dummmy text dummmy text dummmy text dummmy text dummmy text dummmy text dummmy text dummmy text dummmy text dummmy text dummmy text dummmy text dummmy text dummmy text dummmy text dummmy text dummmy text dummmy text dummmy text dummmy text dummmy text dummmy text.', 'error':'None'})


if __name__ == '__main__':
    app.run()