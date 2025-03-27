import React, { useState, useEffect, useRef } from "react";
import { Search, LocationOn } from "@mui/icons-material";
import Lottie from "lottie-react";
import earthHappy from '../images/happyearth.json'; // Import Lottie JSON file
import earthmask from '../images/maskearth.json'; // Import Lottie JSON file
import AQIChart from './AQIChart';
import Prediction from "./Prediction";
import PreventiveMeasures from "./PreventiveMeasures";

const tamilNaduCities = [
  { city: "Chennai", lat: 13.0827, lon: 80.2707 },
  { city: "Coimbatore", lat: 11.0168, lon: 76.9558 },
  { city: "Madurai", lat: 9.9252, lon: 78.1198 },
  { city: "Tiruchirappalli", lat: 10.7905, lon: 78.7047 },
  { city: "Salem", lat: 11.6643, lon: 78.1460 },
  { city: "Erode", lat: 11.3410, lon: 77.7172 },
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
  { city: "Cuddalore", lat: 11.7480, lon: 79.7714 },
  { city: "Ariyalur", lat: 11.1385, lon: 79.0756 },
  { city: "Sivakasi", lat: 9.4490, lon: 77.7980 },
  { city: "Virudhunagar", lat: 9.5851, lon: 77.9578 },
  { city: "Pudukkottai", lat: 10.3797, lon: 78.8200 },
  { city: "Perambalur", lat: 11.2360, lon: 78.8831 },
  { city: "Tenkasi", lat: 8.9591, lon: 77.3153 },
  { city: "Ramanathapuram", lat: 9.3716, lon: 78.8308 },
  { city: "Krishnagiri", lat: 12.5186, lon: 78.2138 },
  { city: "Namakkal", lat: 11.2194, lon: 78.1670 },
  { city: "Dharmapuri", lat: 12.1274, lon: 78.1570 },
  { city: "Udhagamandalam (Ooty)", lat: 11.4102, lon: 76.6950 },
  { city: "Hosur", lat: 12.7369, lon: 77.8321 },
  { city: "Mayiladuthurai", lat: 11.1035, lon: 79.6553 },
  { city: "Chengalpattu", lat: 12.6938, lon: 79.9751 },
  { city: "Tiruvannamalai", lat: 12.2253, lon: 79.0747 },
  { city: "Thiruvarur", lat: 10.7725, lon: 79.6368 },
  { city: "Viluppuram", lat: 11.9391, lon: 79.4878 },
  { city: "Tirupathur", lat: 12.4966, lon: 78.5730 }
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
  if (aqi <= 100) return "Air quality is Moderate 😐. Sensitive groups should be cautious.";
  if (aqi <= 200) return "Unhealthy for sensitive groups 🏥. Avoid prolonged exposure.";
  if (aqi <= 300) return "Unhealthy ⚠️. Everyone should limit outdoor activities.";
  return "Hazardous ☠️. Stay indoors and wear a mask.";
};

const getAQIAnimation = (aqi) => {
  if (aqi <= 50) return earthHappy;
  if (aqi <= 100) return earthmask;
  return null;
};

const AQIBox = ({ aqi, city }) => {
  const lottieRef = useRef(null);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.play();
    }
  }, [aqi]);
  const animationData = getAQIAnimation(aqi); // Get animation once
  return (
    <div className={`w-4/5 mx-auto p-14 rounded-2xl shadow-2xl text-white flex items-center justify-between ${getAQIColor(aqi)}`}>
      {/* Left Section - Text Info */}
      <div className="text-left">
        <h2 className="text-4xl font-bold">{city}</h2>
        <p className="text-3xl font-semibold mt-2">Air Quality Index (AQI)</p>
        <div className="text-7xl font-extrabold mt-4">{aqi}</div>
        <p className="text-xl font-medium mt-4">{getAQIDescription(aqi)}</p>
      </div>

      {/* Right Section - Lottie Animation */}
      {animationData && (
        <Lottie
          animationData={animationData}
          loop
          autoplay
          style={{ height: 240, width: 240 }}
          rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
        />
      )}
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
    const apiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone&domains=cams_global`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      setAqi(data.current.us_aqi);
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
      const filtered = tamilNaduCities.filter((city) =>
        city.city.toLowerCase().includes(query) // Convert city names to lowercase for case-insensitive search
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
        <h1 className="text-2xl font-bold mb-6">AQI Tracker</h1>
        <ul className="space-y-4">
          <li
            className={`p-3 rounded-lg hover:bg-[#637471] transition cursor-pointer font-poppins ${activeSection === "Dashboard" ? "bg-[#637471]" : ""}`}
            onClick={() => setActiveSection("Dashboard")}
          >
            Dashboard
          </li>
          <li
            className={`p-3 rounded-lg hover:bg-[#637471] transition cursor-pointer font-poppins ${activeSection === "DiseasePrediction" ? "bg-[#637471]" : ""}`}
            onClick={() => setActiveSection("DiseasePrediction")}
          >
            Disease Prediction
          </li>
          <li
            className={`p-3 rounded-lg hover:bg-[#637471] transition cursor-pointer font-poppins ${activeSection === "PreventiveMeasures" ? "bg-[#637471]" : ""}`}
            onClick={() => setActiveSection("PreventiveMeasures")}
          >
            Preventive Measures
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        {activeSection === "Dashboard" && (
          <>
            {/* Search Bar */}
            <div className="p-4 mb-6 w-full flex justify-center items-center mt-10 relative">
              <div className="flex items-center bg-white shadow-md rounded-full p-3 transition-transform hover:scale-105">
                <Search className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search city..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-[300px] pl-2 outline-none text-gray-700"
                />
              </div>

              {/* Filtered Cities Dropdown */}
              {filteredCities.length > 0 && (
                <div className="bg-white shadow-lg p-4 w-[300px] absolute left-[650px] top-[80px] rounded-3xl">
                  <ul>
                    {filteredCities.map((city) => (
                      <li
                        key={city.city}
                        className="cursor-pointer hover:bg-gray-200 p-2 rounded flex items-center space-x-2"
                        onClick={() => handleSelectCity(city)}
                      >
                        <LocationOn className="text-gray-500" />
                        <span>{city.city}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>



            {/* Display AQI box */}
            <AQIBox aqi={aqi} city={location} />

            {/* AQI Card */}
            <div className="flex justify-center items-center mt-14 ml-20">
              <div className="p-6 bg-white rounded-lg shadow-lg md:w-auto">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Major Pollutants</h2>

                {/* Grid Layout */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[{ name: "PM2.5", value: pollutants.pm25, unit: "µg/m³", color: "from-pink-400 to-pink-600" },
                  { name: "PM10", value: pollutants.pm10, unit: "µg/m³", color: "from-yellow-400 to-yellow-600" },
                  { name: "NO₂", value: pollutants.no2, unit: "ppb", color: "from-blue-400 to-blue-600" },
                  { name: "SO₂", value: pollutants.so2, unit: "ppb", color: "from-purple-400 to-purple-600" },
                  { name: "CO", value: pollutants.co, unit: "ppm", color: "from-red-400 to-red-600" },
                  { name: "O₃", value: pollutants.o3, unit: "ppb", color: "from-green-400 to-green-600" },
                  ].map((pollutant, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg shadow-md bg-gradient-to-r ${pollutant.color} text-white flex flex-col items-center justify-center transition-transform transform hover:scale-105`}
                    >
                      <span className="font-medium">{pollutant.name}</span>
                      <span className="text-lg font-semibold">
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
