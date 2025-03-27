import React, { useEffect, useState } from "react";

const Prediction = () => {
  // Default: Coimbatore
  const [city, setCity] = useState("Coimbatore");
  const [lat, setLat] = useState(11.0168);
  const [lon, setLon] = useState(76.9558);
  const [healthScore, setHealthScore] = useState(0);
  const [healthClass, setHealthClass] = useState("Loading...");
  const [loading, setLoading] = useState(true);
  const [searchCity, setSearchCity] = useState("");

  // Fetch health data from Flask API
  const fetchHealthData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/predict?lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      setHealthScore(data.PredictedHealthImpactScore); // Match Flask API response
      setHealthClass(data.PredictedHealthImpactClass);
    } catch (error) {
      console.error("Error fetching health data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch coordinates from city name
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

  // Fetch health data on mount (default: Coimbatore)
  useEffect(() => {
    fetchHealthData();
  }, []);

  // Fetch new data when lat/lon change
  useEffect(() => {
    fetchHealthData();
  }, [lat, lon]);

  const getHealthStatus = (healthClass) => {
    const parsedClass = Math.round(Number(healthClass)); // Convert to integer
    console.log("Received healthClass:", healthClass, "Parsed:", parsedClass); // Debugging

    const healthLabels = {
      0: { label: "Very High", color: "bg-red-900" },
      1: { label: "High", color: "bg-red-500" },
      2: { label: "Moderate", color: "bg-yellow-500" },
      3: { label: "Low", color: "bg-green-500" },
      4: { label: "Very Low", color: "bg-green-900" },
    };

    return (
      healthLabels[parsedClass] || { label: "Unknown", color: "bg-gray-500" }
    );
  };

  const { label, color } = getHealthStatus(healthClass);

  return (
    <div className="flex flex-col items-center justify-center mt-20 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      {/* Header */}
      <div className="w-full max-w-2xl bg-gray-900 text-center py-4 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold font-poppins">
          Disease Prediction & Prevention
        </h1>
      </div>

      {/* Search Bar */}
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

      {/* Main Content */}
      <div className="w-full max-w-2xl mt-6">
        <h1 className="text-xl font-semibold text-center">{city}</h1>

        {/* Health Score Card */}
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
              {/* Refresh Button */}
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

        {/* Footer */}
        <div className="mt-10 text-center text-gray-400 text-sm font-poppins">
          Data fetched from AI-based prediction model.
        </div>
      </div>
    </div>
  );
};

export default Prediction;
