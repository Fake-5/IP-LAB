from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import requests
import joblib

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Requests

# Load models
regressor = joblib.load("health_score_model.pkl")
classifier = joblib.load("health_class_model.pkl")
label_encoder = joblib.load("label_encoder.pkl")

def get_live_air_quality(lat, lon):
    url = f"https://air-quality-api.open-meteo.com/v1/air-quality?latitude={lat}&longitude={lon}&current=european_aqi,pm10,pm2_5,nitrogen_dioxide,sulphur_dioxide,ozone"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json().get("current", {})
        return {
            "AQI": data.get("european_aqi", 0),
            "PM10": data.get("pm10", 0),
            "PM2_5": data.get("pm2_5", 0),
            "NO2": data.get("nitrogen_dioxide", 0),
            "SO2": data.get("sulphur_dioxide", 0),
            "O3": data.get("ozone", 0),
        }
    return None

@app.route("/predict", methods=["GET"])
def predict_health_impact():
    lat = request.args.get("lat")
    lon = request.args.get("lon")
    if not lat or not lon:
        return jsonify({"error": "Latitude and Longitude are required!"}), 400

    try:
        lat, lon = float(lat), float(lon)
    except ValueError:
        return jsonify({"error": "Invalid latitude or longitude!"}), 400

    live_data = get_live_air_quality(lat, lon)
    if not live_data:
        return jsonify({"error": "Failed to fetch air quality data"}), 500

    df = pd.DataFrame([live_data])
    health_score = float(regressor.predict(df)[0])
    health_class_encoded = int(classifier.predict(df)[0])  # Convert to int
    health_class = str(label_encoder.inverse_transform([health_class_encoded])[0])

    return jsonify({
        "PredictedHealthImpactScore": round(health_score, 1),
        "PredictedHealthImpactClass": health_class,
        "AQI": live_data["AQI"]
    })

if __name__ == "__main__":
    app.run(debug=True)
