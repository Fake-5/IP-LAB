
import React, { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = "YOUR_API_KEY"; // Replace with actual API key
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const Prediction = () => {
  const [city, setCity] = useState("Coimbatore");
  const [lat, setLat] = useState(11.0168);
  const [lon, setLon] = useState(76.9558);
  const [healthScore, setHealthScore] = useState(0);
  const [healthClass, setHealthClass] = useState("Loading...");
  const [loading, setLoading] = useState(true);
  const [searchCity, setSearchCity] = useState("");
  const [showMeasures, setShowMeasures] = useState(false);
  const [geminiLoading, setGeminiLoading] = useState(false);
  const [geminiError, setGeminiError] = useState(null);
  const [generatedContent, setGeneratedContent] = useState(null);

  const fetchHealthData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/predict?lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      setHealthScore(data.PredictedHealthImpactScore);
      setHealthClass(data.PredictedHealthImpactClass);
      
      // Fetch Gemini recommendations after getting health data
      await fetchGeminiRecommendations(
        data.currentAQI, // You'll need to get this from your API
        data.PredictedHealthImpactScore,
        data.pollutants
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchGeminiRecommendations = async (aqi, healthScore, pollutants) => {
    setGeminiLoading(true);
    setGeminiError(null);
    
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `As a public health AI expert, analyze this environmental data:
      - City: ${city}
      - AQI: ${aqi}
      - Health Risk Score: ${healthScore}%
      - Pollutants: ${JSON.stringify(pollutants)}
      
      Provide in JSON format with:
      1. "risks": array of 3 major health risks
      2. "measures": array of 5 preventive measures
      3. "vulnerable_groups": array of vulnerable populations
      4. "recommended_activities": array of safe activities`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text().replace(/``````/g, '');
      
      setGeneratedContent(JSON.parse(text));
    } catch (error) {
      setGeminiError("Failed to generate recommendations. Please try again.");
      console.error("Gemini API Error:", error);
    } finally {
      setGeminiLoading(false);
    }
  };
  const fetchCityCoordinates = async () => {
    if (!searchCity.trim()) return;
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${searchCity}&count=1`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setCity(data.results[0].name);
        setLat(data.results[0].latitude);
        setLon(data.results[0].longitude);
      } else {
        alert("City not found. Please enter a valid name.");
      }
    } catch (error) {
      console.error("Error fetching city coordinates:", error);
    }
  };

  useEffect(() => {
    fetchHealthData();
  }, []);

  useEffect(() => {
    fetchHealthData();
  }, [lat, lon]);

  const getHealthStatus = (healthClass) => {
    const parsedClass = Math.round(Number(healthClass));
    const healthLabels = {
      0: { label: "Very High", color: "bg-red-900" },
      1: { label: "High", color: "bg-red-500" },
      2: { label: "Moderate", color: "bg-yellow-500" },
      3: { label: "Low", color: "bg-green-500" },
      4: { label: "Very Low", color: "bg-green-900" },
    };
    return healthLabels[parsedClass] || { label: "Unknown", color: "bg-gray-500" };
  };

  const getPreventiveMeasures = (healthClass) => {
    const parsedClass = Math.round(Number(healthClass));
    const measures = {
      0: {
        risks: ["Respiratory failure", "Cardiac issues", "Immediate health hazards"],
        measures: [
          "Avoid all outdoor activities",
          "Use N95 masks mandatory",
          "Consider temporary relocation"
        ]
      },
      1: {
        risks: ["Asthma attacks", "Reduced lung function", "Eye irritation"],
        measures: [
          "Limit outdoor exposure",
          "Use air purifiers indoors",
          "Stay hydrated"
        ]
      },
      2: {
        risks: ["Allergy flare-ups", "Mild respiratory discomfort"],
        measures: [
          "Sensitive groups should take precautions",
          "Keep medications handy",
          "Monitor air quality hourly"
        ]
      },
      3: {
        risks: ["Minor irritation for sensitive individuals"],
        measures: [
          "Normal outdoor activities safe",
          "Maintain good indoor ventilation",
          "Stay updated on air quality"
        ]
      },
      4: {
        risks: ["No significant health risks"],
        measures: [
          "Enjoy outdoor activities",
          "Maintain normal routines",
          "Continue monitoring for changes"
        ]
      }
    };
    return measures[parsedClass] || { risks: [], measures: [] };
  };

  const { label, color } = getHealthStatus(healthClass);

  return (
    <div className="flex flex-col items-center justify-center mt-20 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <div className="w-full max-w-2xl bg-gray-900 text-center py-4 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold font-poppins">
          Disease Prediction & Prevention
        </h1>
      </div>

      <div className="mt-6 w-full max-w-lg flex">
        <input
          type="text"
          placeholder="Enter city name..."
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          className="flex-1 p-3 rounded-l-lg border-none outline-none text-black font-poppins"
        />
        <button
          onClick={fetchCityCoordinates}
          className="bg-blue-500 px-5 py-3 rounded-r-lg hover:bg-blue-600 transition font-poppins"
        >
          Search
        </button>
      </div>

      <div className="w-full max-w-2xl mt-6">
        <h1 className="text-xl font-semibold text-center">{city}</h1>

        <div className={`mt-6 p-6 rounded-lg shadow-xl ${color} text-white relative`}>
          <h2 className="text-xl text-gray-800 font-semibold font-poppins">
            Predicted Health Score
          </h2>
          {loading ? (
            <div className="mt-4 text-gray-700 text-center animate-pulse font-poppins">
              Fetching data...
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center mt-4">
              <div className="w-32 h-32 flex items-center justify-center text-3xl font-bold bg-white text-black rounded-full shadow-md font-poppins">
                {healthScore.toFixed(1)}%
              </div>
              <span className="text-lg text-gray-800 font-semibold mt-3 font-poppins">
                {label}
              </span>

              <div className="mt-4 flex justify-center absolute top-3 right-6">
                <button
                  onClick={fetchHealthData}
                  className="bg-gray-800 hover:bg-gray-700 font-poppins px-4 py-2 rounded shadow-lg transition duration-300"
                >
                  Refresh
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Button below yellow section */}
        <button
          onClick={() => setShowMeasures(!showMeasures)}
          className="mt-6 bg-gray-800 hover:bg-gray-700 font-poppins px-4 py-2 rounded shadow-lg transition duration-300 w-full max-w-md mx-auto"
        >
          Potential Risk & Preventive Measures
        </button>

        {/* Show Measures Section */}
        {showMeasures && (
    <div className="w-full mt-6 bg-white/90 rounded-lg p-4 text-black">
      {geminiLoading ? (
        <div className="text-center animate-pulse">Analyzing risks...</div>
      ) : geminiError ? (
        <div className="text-red-500 text-center">{geminiError}</div>
      ) : generatedContent && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-bold mb-2 text-red-600">Health Risks:</h3>
            <ul className="list-disc pl-5 space-y-2">
              {generatedContent.risks.map((risk, index) => (
                <li key={index} className="font-medium">{risk}</li>
              ))}
            </ul>
            
            <h3 className="text-lg font-bold mt-4 text-purple-600">Vulnerable Groups:</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {generatedContent.vulnerable_groups.map((group, index) => (
                <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  {group}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-2 text-green-600">Preventive Measures:</h3>
            <ul className="list-disc pl-5 space-y-2">
              {generatedContent.measures.map((measure, index) => (
                <li key={index} className="font-medium">{measure}</li>
              ))}
            </ul>
            
            <h3 className="text-lg font-bold mt-4 text-blue-600">Safe Activities:</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {generatedContent.recommended_activities.map((activity, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {activity}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )}

        {/* Footer */}
        <div className="mt-10 text-center text-gray-400 text-sm font-poppins">
          Data fetched from AI-based prediction model.
        </div>
      </div>
    </div>
  );
};

export default Prediction;
