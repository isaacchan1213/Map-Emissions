from flask import Flask, jsonify
import json
import os

app = Flask(__name__)

@app.route('/get-cars')
def get_cars():
    file_path = 'car-data.json'
    with open(file_path, 'r') as f:
        data = json.load(f)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)