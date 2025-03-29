import React, { useState, useEffect } from "react";
import { Search, LocationOn } from "@mui/icons-material";
import AQIChart from "./AQIChart";
import Prediction from "./Prediction";
import PreventiveMeasures from "./PreventiveMeasures";

const tamilNaduCities = [
  { city: "Chennai", lat: 13.0827, lon: 80.2707 },
  { city: "Coimbatore", lat: 11.0168, lon: 76.9558 },
  { city: "Madurai", lat: 9.9252, lon: 78.1198 },
  { city: "Tiruchirappalli", lat: 10.7905, lon: 78.7047 },
  { city: "Salem", lat: 11.6643, lon: 78.146 },
  { city: "Erode", lat: 11.341, lon: 77.7172 },
  { city: "Vellore", lat: 12.9165, lon: 79.1325 },
  { city: "Tirunelveli", lat: 8.7139, lon: 77.7567 },
  { city: "Thoothukudi", lat: 8.7642, lon: 78.1348 },
  { city: "Nagercoil", lat: 8.1782, lon: 77.4326 },
  { city: "Thanjavur", lat: 10.7867, lon: 79.1378 },
  { city: "Dindigul", lat: 10.3624, lon: 77.9695 },
  { city: "Kanchipuram", lat: 12.8342, lon: 79.7036 },
  { city: "Tiruppur", lat: 11.1085, lon: 77.3411 },
  { city: "Karur", lat: 10.9601, lon: 78.0766 },
  { city: "Nagapattinam", lat: 10.7667, lon: 79.8333 },
  { city: "Kumbakonam", lat: 10.9603, lon: 79.3773 },
  { city: "Cuddalore", lat: 11.748, lon: 79.7714 },
  { city: "Ariyalur", lat: 11.1385, lon: 79.0756 },
  { city: "Sivakasi", lat: 9.449, lon: 77.798 },
  { city: "Virudhunagar", lat: 9.5851, lon: 77.9578 },
  { city: "Pudukkottai", lat: 10.3797, lon: 78.82 },
  { city: "Perambalur", lat: 11.236, lon: 78.8831 },
  { city: "Tenkasi", lat: 8.9591, lon: 77.3153 },
  { city: "Ramanathapuram", lat: 9.3716, lon: 78.8308 },
  { city: "Krishnagiri", lat: 12.5186, lon: 78.2138 },
  { city: "Namakkal", lat: 11.2194, lon: 78.167 },
  { city: "Dharmapuri", lat: 12.1274, lon: 78.157 },
  { city: "Udhagamandalam (Ooty)", lat: 11.4102, lon: 76.695 },
  { city: "Hosur", lat: 12.7369, lon: 77.8321 },
  { city: "Mayiladuthurai", lat: 11.1035, lon: 79.6553 },
  { city: "Chengalpattu", lat: 12.6938, lon: 79.9751 },
  { city: "Tiruvannamalai", lat: 12.2253, lon: 79.0747 },
  { city: "Thiruvarur", lat: 10.7725, lon: 79.6368 },
  { city: "Viluppuram", lat: 11.9391, lon: 79.4878 },
  { city: "Tirupathur", lat: 12.4966, lon: 78.573 },
];

const getAQIColor = (aqi) => {
  if (aqi <= 50) return "bg-green-500"; // Good
  if (aqi <= 100) return "bg-yellow-400"; // Moderate
  if (aqi <= 200) return "bg-orange-500"; // Unhealthy for sensitive groups
  if (aqi <= 300) return "bg-red-600"; // Unhealthy
  return "bg-purple-700"; // Hazardous
};

const getAQIDescription = (aqi) => {
  if (aqi <= 50) return "Air quality is Good 😊. It's safe to go outside!";
  if (aqi <= 100)
    return "Air quality is Moderate 😐.";
  if (aqi <= 200)
    return "Unhealthy. Avoid prolonged exposure.";
  if (aqi <= 300)
    return "Unhealthy ⚠️. Everyone should limit outdoor activities.";
  return "ERROR";
};

const AQIBox = ({ aqi, city }) => {
  return (
    <div
      className={`w-4/5 mx-auto p-14 rounded-2xl relative shadow-2xl text-white flex items-center justify-between ${getAQIColor(
        aqi
      )}`}
    >
      {/* Left Section - Text Info */}
      <div className="text-left">
        <p className="text-4xl font-bold font-poppins mb-10">
          Air Quality Index
        </p>
        <p className="text-xl font-poppins mb-10 w-[500px]">
          {getAQIDescription(aqi)}
        </p>
        <div className="text-5xl font-bold mt-4 px-7 py-10 rounded-full bg-white text-gray-800 font-poppins absolute top-20 right-24 shadow-md">
          {aqi}
        </div>
        <div className="flex items-center gap-6">
          <h2 className="text-2xl font-semibold font-poppins">{city}</h2>
          <LocationOn className="text-green-500" />
        </div>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [location, setLocation] = useState("Coimbatore");
  const [aqi, setAqi] = useState(null);
  const [pollutants, setPollutants] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);

  const fetchAQIData = async (latitude, longitude) => {
    const apiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=european_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      setAqi(data.current.european_aqi);
      setPollutants({
        pm25: data.current.pm2_5,
        pm10: data.current.pm10,
        no2: data.current.nitrogen_dioxide,
        so2: data.current.sulphur_dioxide,
        co: data.current.carbon_monoxide,
        o3: data.current.ozone,
      });
    } catch (error) {
      console.error("Error fetching AQI data:", error);
    }
  };

  useEffect(() => {
    fetchAQIData(11.0168, 76.9558); // Default to Coimbatore's latitude and longitude
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase(); // Make search query lowercase
    setSearchQuery(e.target.value);

    if (query) {
      const filtered = tamilNaduCities.filter(
        (city) => city.city.toLowerCase().includes(query) // Convert city names to lowercase for case-insensitive search
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]); // Reset the filtered cities if the search query is empty
    }
  };

  const handleSelectCity = (city) => {
    setLocation(city.city);
    fetchAQIData(city.lat, city.lon); // Fetch AQI data for selected city's latitude and longitude
    setSearchQuery(""); // Clear the search input
    setFilteredCities([]); // Clear filtered cities
  };

  return (
    <div className="flex bg-[#e0ebeb]">
      {/* Sidebar - Fixed on the Left */}
      <div className="w-64 bg-[#a7bcb9] text-black p-6 shadow-lg fixed top-[68px] left-0 h-screen">
        <h1 className="text-2xl font-bold mb-6 font-poppins">AQI Tracker</h1>
        <ul className="space-y-4 mt-20">
          <li
            className={`p-3 rounded-lg hover:bg-[#637471] transition cursor-pointer font-poppins ${
              activeSection === "Dashboard" ? "bg-[#637471] text-white" : ""
            }`}
            onClick={() => setActiveSection("Dashboard")}
          >
            Dashboard
          </li>
          <li
            className={`p-3 rounded-lg hover:bg-[#637471] transition cursor-pointer font-poppins ${
              activeSection === "DiseasePrediction" ? "bg-[#637471] text-white" : ""
            }`}
            onClick={() => setActiveSection("DiseasePrediction")}
          >
            Disease Prediction
          </li>
          
        </ul>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        {activeSection === "Dashboard" && (
          <>
            {/* Search Bar */}
            <div className="p-4 mb-6 w-full flex justify-center items-center mt-10 relative">
              <div className="flex items-center bg-white shadow-md rounded-full p-3 transition-transform hover:scale-105 relative">
                <Search className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search city..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-[400px] pl-2 outline-none text-gray-700 font-poppins"
                />
              </div>

              {/* Filtered Cities Dropdown */}
              {filteredCities.length > 0 && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white shadow-lg p-4 w-[400px] rounded-3xl mt-2 z-50">
                  <ul>
                    {filteredCities.map((city) => (
                      <li
                        key={city.city}
                        className="cursor-pointer hover:bg-gray-200 p-2 rounded flex items-center space-x-2 font-poppins"
                        onClick={() => handleSelectCity(city)}
                      >
                        <LocationOn className="text-red-500" />
                        <span className="font-poppins">{city.city}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Display AQI box */}
            <AQIBox aqi={aqi} city={location} />

            {/* AQI Card */}
            <div className="flex items-center mt-14 ml-14 gap-48">
              <div className="p-6 bg-white rounded-lg shadow-lg md:w-auto">
                <h2 className="text-xl text-gray-800 mb-4 font-semibold font-poppins">
                  Major Pollutants
                </h2>

                {/* Grid Layout */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    {
                      name: "PM2.5",
                      value: pollutants.pm25,
                      unit: "µg/m³",
                      color: "from-pink-400 to-pink-600",
                    },
                    {
                      name: "PM10",
                      value: pollutants.pm10,
                      unit: "µg/m³",
                      color: "from-yellow-400 to-yellow-600",
                    },
                    {
                      name: "NO₂",
                      value: pollutants.no2,
                      unit: "ppb",
                      color: "from-blue-400 to-blue-600",
                    },
                    {
                      name: "SO₂",
                      value: pollutants.so2,
                      unit: "ppb",
                      color: "from-purple-400 to-purple-600",
                    },
                    {
                      name: "CO",
                      value: pollutants.co,
                      unit: "ppm",
                      color: "from-red-400 to-red-600",
                    },
                    {
                      name: "O₃",
                      value: pollutants.o3,
                      unit: "ppb",
                      color: "from-green-400 to-green-600",
                    },
                  ].map((pollutant, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg shadow-md bg-gradient-to-r ${pollutant.color} text-white flex flex-col items-center justify-center transition-transform transform hover:scale-105`}
                    >
                      <span className="font-medium font-poppins">
                        {pollutant.name}
                      </span>
                      <span className="text-lg  font-poppins">
                        {pollutant.value} {pollutant.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AQI Chart */}
              <AQIChart />
            </div>
          </>
        )}

        {/* Other Sections */}
        {activeSection === "DiseasePrediction" && <Prediction />}
        {activeSection === "PreventiveMeasures" && <PreventiveMeasures />}
      </div>
    </div>
  );
};

export default Sidebar;
