import React, { useState } from "react";
import AQIChart from "./AQIChart";
import SearchBar from "./Searchbar";
import "./DashBoard.css";
import NavigationIcon from '@mui/icons-material/Navigation';

const aqiData = {
  "Coimbatore": 88,
  "Chennai": 105,
  "Bangalore": 95,
  "Salem": 75,
  "Mumbai": 120,
  "Delhi": 250,
  "Hyderabad": 110,
};

const Dashboard = () => {
  const [location, setLocation] = useState("Coimbatore");
  const [aqi, setAqi] = useState(aqiData["Coimbatore"]);

  const getAQIColor = (aqi) => {
    if (aqi <= 50) return { color: "#4caf50", text: "#ffffff" };
    if (aqi <= 100) return { color: "#ff9800", text: "#ffffff" };
    if (aqi <= 150) return { color: "#f44336", text: "#ffffff" };
    if (aqi <= 200) return { color: "#8e24aa", text: "#ffffff" };
    if (aqi <= 300) return { color: "#6d4c41", text: "#ffffff" };
    return { color: "#000000", text: "#ffffff" };
  };

  const { color, text } = getAQIColor(aqi);

  const handleSearch = (query) => {
    if (aqiData[query]) {
      setLocation(query);
      setAqi(aqiData[query]);
    }
  };

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
    <div className="pollutant pm25">
      <span>Particulate Matter (PM2.5)</span>
      <span>35 µg/m³</span>
    </div>
    <div className="pollutant pm10">
      <span>Particulate Matter (PM10)</span>
      <span>55 µg/m³</span>
    </div>
    <div className="pollutant no2">
      <span>Nitrogen Dioxide (NO₂)</span>
      <span>20 ppb</span>
    </div>
    <div className="pollutant so2">
      <span>Sulfur Dioxide (SO₂)</span>
      <span>15 ppb</span>
    </div>
    <div className="pollutant co">
      <span>Carbon Monoxide (CO)</span>
      <span>0.9 ppm</span>
    </div>
    <div className="pollutant o3">
      <span>Ozone (O₃)</span>
      <span>30 ppb</span>
    </div>
  </div>
</div>


      <AQIChart />
      
    </div>
  );
};

export default Dashboard;
