import React from "react";
import "./AQIWidget.css";

const AQIWidget = ({ city, aqi }) => {
  const getStatus = (aqi) => {
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Moderate";
    if (aqi <= 150) return "Unhealthy for Sensitive Groups";
    if (aqi <= 200) return "Unhealthy";
    if (aqi <= 300) return "Very Unhealthy";
    return "Hazardous";
  };

  return (
    <div className="aqi-widget">
      <h3 className="aqi-city">{city}</h3>
      <p className="aqi-value">{aqi}</p>
      <p className="aqi-status">{getStatus(aqi)}</p>
    </div>
  );
};

export default AQIWidget;
