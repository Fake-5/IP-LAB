import React, { useState, useEffect } from "react";
import AQIChart from "./AQIChart";
import SearchBar from "./Searchbar";
import "./DashBoard.css";
import NavigationIcon from '@mui/icons-material/Navigation';

const Dashboard = () => {
  const [location, setLocation] = useState("Coimbatore");
  const [aqi, setAqi] = useState(null);
  const [pollutants, setPollutants] = useState({});
  
  const getAQIColor = (aqi) => {
    if (aqi <= 50) return { color: "#4caf50", text: "#ffffff" };
    if (aqi <= 100) return { color: "#ff9800", text: "#ffffff" };
    if (aqi <= 150) return { color: "#f44336", text: "#ffffff" };
    if (aqi <= 200) return { color: "#8e24aa", text: "#ffffff" };
    if (aqi <= 300) return { color: "#6d4c41", text: "#ffffff" };
    return { color: "#000000", text: "#ffffff" };
  };

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
    fetchAQIData(11.0168, 76.9558); // Default: Coimbatore
  }, []);

  const handleSearch = (query, lat, lon) => {
    setLocation(query);
    fetchAQIData(lat, lon);
  };

  const { color, text } = getAQIColor(aqi);

  return (
    <div className="dashboard">
      <div className="header">
        <h1>AQI Dashboard</h1>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="aqi-section" style={{ background: `linear-gradient(to top, ${color}, #f9f9f9)` }}>
        <h2 className="aqi-title">Air Quality Index (AQI)</h2>
        <div className="aqi-info">
          <div className="aqi-value" style={{ color: text }}>{aqi}</div>
          <div className="aqi-location" style={{ color: text }}>{location}</div>
        </div>

        <div className="aqi-color-chart">
          <div className="pin" style={{ left: `${(aqi / 300) * 100}%` }}>
            <NavigationIcon />
          </div>
          <div className="color-bar">
            <div className="good"></div>
            <div className="moderate"></div>
            <div className="poor"></div>
            <div className="unhealthy"></div>
            <div className="severe"></div>
            <div className="hazardous"></div>
          </div>
        </div>
      </div>

      <div className="pollutants-section">
        <h2>Major Pollutants</h2>
        <div className="pollutants-grid">
          <div className="pollutant pm25"><span>PM2.5</span><span>{pollutants.pm25} µg/m³</span></div>
          <div className="pollutant pm10"><span>PM10</span><span>{pollutants.pm10} µg/m³</span></div>
          <div className="pollutant no2"><span>NO₂</span><span>{pollutants.no2} ppb</span></div>
          <div className="pollutant so2"><span>SO₂</span><span>{pollutants.so2} ppb</span></div>
          <div className="pollutant co"><span>CO</span><span>{pollutants.co} ppm</span></div>
          <div className="pollutant o3"><span>O₃</span><span>{pollutants.o3} ppb</span></div>
        </div>
      </div>

      <AQIChart />
    </div>
  );
};

export default Dashboard;
