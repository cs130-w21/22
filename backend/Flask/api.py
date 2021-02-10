import flask
import urllib.request
import pickle
from flask import request

app = flask.Flask(__name__)
app.config["DEBUG"] = True

burtWeights = None

def analyze():
    # Run analysis on received data
    return

@app.route('/', methods=['GET', 'POST'])
def home():
    with urllib.request.urlopen('https://github.com/cs130-w21/22/raw/master/frontend/public/index.html') as response:
        html = response.read()
        
    if request.method == 'POST':
        # If burtWeights is not none, then initialize it by importing the pickle file
        # Run analysis on input
        return "<h1>Placeholder</h1><p>This is output by api.py in response to a POST request.</p>"

    return html

if __name__ == '__main__':
    app.run()
