import React from "react";
import "./AQIWidget.css";

const AQIWidget = ({ city, aqi, status }) => {
  return (
    <div className="aqi-widget">
      <h3 className="aqi-city">{city}</h3>
      <p className="aqi-value">{aqi}</p>
      <p className="aqi-status">{status}</p>
    </div>
  );
};

export default AQIWidget;
