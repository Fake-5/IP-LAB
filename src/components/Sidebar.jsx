import React from "react";
import "./Sidebar.css";

const topCitiesAQI = [
  { city: "Chennai", aqi: 320 },
  { city: "Coimbatore", aqi: 290 },
  { city: "Madurai", aqi: 275 },
  { city: "Tiruchirappalli", aqi: 260 },
  { city: "Salem", aqi: 250 },
  { city: "Erode", aqi: 245 },
  { city: "Vellore", aqi: 240 },
  { city: "Tirunelveli", aqi: 230 },
  { city: "Thoothukudi", aqi: 225 },
  { city: "Nagercoil", aqi: 220 }
];

const getAQIColor = (aqi) => {
  if (aqi > 300) return "#ff0000"; // Hazardous
  if (aqi > 250) return "#ff4500"; // Very Unhealthy
  if (aqi > 200) return "#ff8c00"; // Unhealthy
  return "#ffa500"; // Moderate
};

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h1 className="sidebar-title">AQI Tracker</h1>
      <ul className="sidebar-menu">
        <li className="sidebar-item">Dashboard</li>
        <li className="sidebar-item">Compare Cities</li>
        <li className="sidebar-item">Historical Data</li>
      </ul>
      
      <hr className="sidebar-divider" />
      <h2 className="sidebar-subtitle">Top 10 Dangerous AQI Cities</h2>
      <ul className="aqi-list">
        {topCitiesAQI.map((cityData, index) => (
          <li key={index} className="aqi-item" style={{ color: getAQIColor(cityData.aqi) }}>
            {cityData.city}: {cityData.aqi}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
