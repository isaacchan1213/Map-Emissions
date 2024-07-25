from flask import Flask, jsonify
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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
    transportation = data.get('transportation', '')
    distance = data.get('distance', '')
    
    if transportation == "DRIVING":
        car_model = data.get('carModel', '')
    else: 
        car_model = ''

    if car_model:
        user_message = f"""Based on the following data, provide suggestions in Markdown format 2-3 bulletpoints. Consider other means of transportation
                        as a sentence. Consider how the distance can impact conviencence and how to offer other suggestions based off it. Lastly,
                        consider the car model and how efficient it typically is.
                        \nMeans of Transportation: {transportation}\nCar Model: {car_model}\nDistance: 
                        {distance}\n\nConsider the information above and offer suggestions on how to improve."""
    else:
        user_message = f"""Write this all in Markdown format in roughly 2-3 bulletpoints. Based on the following data, provide encouragement and information on why their method is a better alternative:
                        \nMeans of Transportation: {transportation}\nDistance: {distance}\n\nHighlight the benefits of using {transportation} over other methods."""

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
