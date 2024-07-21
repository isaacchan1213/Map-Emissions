from flask import Flask, jsonify, request
import json
from flask_cors import CORS
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

chat = ChatGroq(
    model="mixtral-8x7b-32768",
    temperature=0.0,
    max_retries=2,
    api_key=os.getenv('GROQ_API_KEY')  
)

system_message = "You are a helpful assistant."
human_message = "{text}"

prompt = ChatPromptTemplate.from_messages([("system", system_message), ("human", human_message)])
chain = prompt | chat

@app.route('/get-cars')
def get_cars():
    try:
        file_path = 'car-data.json'
        with open(file_path, 'r') as f:
            data = json.load(f)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/get-suggestions', methods=['POST'])
def get_suggestions():
    data = request.json
    car_model = data.get('carModel', '')
    transportation = data.get('transportation', '')
    distance = data.get('distance', '')

    user_message = f"Based on the following data, provide suggestions in roughly 3 sentences:
                    \n\nCar Model: {car_model}\nMeans of Transportation: {transportation}\nDistance: 
                    {distance}\n\nConsider the information above and offer suggestions on how to improve."

    messages = [
        ("system", "You are educated in carbon emission reduction."),
        ("user", user_message)
    ]
    
    try:
        # Generate the response
        response = chain.invoke({"text": user_message})
        response_content = response.content if hasattr(response, 'content') else "No response from model"
        return jsonify({'response': response_content})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run()
