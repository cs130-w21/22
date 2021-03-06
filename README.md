# eula.ai

[![Build Status](https://www.travis-ci.com/cs130-w21/22.svg?branch=master)](https://www.travis-ci.com/cs130-w21/22)

A simple web application that tells you if your end-user license agreement is ethical and summarizes your document for easy understanding.

## Setup

To clone and run this application, you will need [Git](https://git-scm.com), [Python 3.8.5](https://www.python.org/downloads/release/python-385/), and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. Begin by cloning repository:

```bash
# Clone this repository
$ git clone https://github.com/cs130-w21/22.git

# Go into the repository
$ cd 22
```

Download the [machine learning model](https://drive.google.com/file/d/1zrMjfwqDHHSCeRlho4C0-iOQ90r5XvwK/view) and place the tarball into the `backend/` folder, set up, and run Flask server:

```bash
# Go into backend/ folder
$ cd backend

# Run script to set up folder for model
$ ./fetch_model.sh

# Install Python dependencies
$ pip3 install -r requirements.txt

# Set environment variable
$ export FLASK_APP=flaskApi.py

# Run Flask app
$ flask run
```

In a new terminal, install dependencies and run the frontend with npm:

```bash
# Install dependencies
$ npm install

# Run the app
$ npm start
```

Or, use [yarn](https://yarnpkg.com/):

```bash
# Install dependencies
$ yarn install

# Run the app
$ yarn start
```
