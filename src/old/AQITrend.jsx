import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./AQITrend.css";

const aqiData = [
  { time: "12 AM", aqi: 85 },
  { time: "1 AM", aqi: 78 },
  { time: "2 AM", aqi: 90 },
  { time: "3 AM", aqi: 95 },
  { time: "4 AM", aqi: 88 },
  { time: "5 AM", aqi: 92 },
  { time: "6 AM", aqi: 110 },
  { time: "7 AM", aqi: 130 },
  { time: "8 AM", aqi: 150 },
  { time: "9 AM", aqi: 140 },
  { time: "10 AM", aqi: 135 },
  { time: "11 AM", aqi: 125 },
  { time: "12 PM", aqi: 120 },
  { time: "1 PM", aqi: 118 },
  { time: "2 PM", aqi: 115 },
  { time: "3 PM", aqi: 110 },
  { time: "4 PM", aqi: 100 },
  { time: "5 PM", aqi: 90 },
  { time: "6 PM", aqi: 85 },
  { time: "7 PM", aqi: 88 },
  { time: "8 PM", aqi: 92 },
  { time: "9 PM", aqi: 95 },
  { time: "10 PM", aqi: 98 },
  { time: "11 PM", aqi: 100 },
];

// Function to determine AQI color
const getAQIColor = (aqi) => {
  if (aqi <= 50) return "#00e400"; // Good (Green)
  if (aqi <= 100) return "#ffff00"; // Moderate (Yellow)
  if (aqi <= 150) return "#ff7e00"; // Unhealthy for Sensitive Groups (Orange)
  if (aqi <= 200) return "#ff0000"; // Unhealthy (Red)
  if (aqi <= 300) return "#8f3f97"; // Very Unhealthy (Purple)
  return "#7e0023"; // Hazardous (Maroon)
};

// Custom Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="tooltip-container">
        <p className="tooltip-text">{`Time: ${payload[0].payload.time}`}</p>
        <p className="tooltip-text">{`AQI: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const AQITrend = () => {
  return (
    <div className="aqi-trend-container">
      <h2 className="aqi-trend-title">24-Hour AQI Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={aqiData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="aqi"
            radius={[5, 5, 0, 0]}
            fill="#8884d8"
            barSize={30}
            onMouseOver={(data, index) => (data.fill = getAQIColor(data.payload.aqi))}
            onMouseOut={(data, index) => (data.fill = "#8884d8")}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AQITrend;
