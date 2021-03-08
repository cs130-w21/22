import io
import json

from flaskApi import app

def test_text_upload():
  client = app.test_client()
  url = '/text'

  mock_request_headers = {}

  mock_request_data = {
      'text': 'lalala.\nokok.'
  }

  response = client.post(url, json=mock_request_data, headers=mock_request_headers)
  assert response.status_code == 200


def test_pdf_upload():
  client = app.test_client()
  url = '/pdf'

  mock_request_headers = {}
  f = open("data/sample_eula.pdf", "rb")

  mock_request_data = {
      'file': (f, 'test.pdf')
  }
              
  response = client.post(url, data=mock_request_data, headers=mock_request_headers)
  assert response.status_code == 200
