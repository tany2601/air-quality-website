from flask import Flask, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

# Simulated data
def get_sensor_data():
    temperature = round(random.uniform(20, 40), 2)
    humidity = round(random.uniform(30, 70), 2)
    air_quality = random.randint(0, 100)
    return {
        'temperature': temperature,
        'humidity': humidity,
        'airQuality': air_quality
    }

@app.route('/data', methods=['GET'])
def get_data():
    sensor_data = get_sensor_data()
    return jsonify(sensor_data)

if __name__ == '__main__':
    app.run(debug=True)
