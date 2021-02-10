from flask import Flask, jsonify, request
import pickle

app = Flask(__name__)
app.config["DEBUG"] = True

burtWeights = None

def analyze():
    # Run analysis on received data
    return

@app.route('/api', methods=['GET'])
def home():
    return jsonify({'msg':'Seems to work properly'})

if __name__ == '__main__':
    app.run()
