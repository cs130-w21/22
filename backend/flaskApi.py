from flask import Flask, jsonify, request
#import inference.py 
import urllib.request

app = Flask(__name__)
app.config["DEBUG"] = True

burtWeights = None

def analyze():
    # Run analysis on received data
    return

@app.route('/pdf', methods=['POST'])
def analyzePdf():
    # Extract text from pdf
    # Call functions imported from innference.py
    # Return important information
    req_json = request.get_json()
    
    return jsonify({'msg':'Request should be pdf. Seems to work properly'})

@app.route('/text', methods=['POST'])
def analyzeText():
    # Call functions imported from innference.py
    # Return important information
    req_json = request.get_json()
    
    return jsonify({'msg':'Request should be string. Seems to work properly'})

if __name__ == '__main__':
    app.run()
