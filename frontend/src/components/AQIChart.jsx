import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const AQIChart = () => {
  const [aqiHistory, setAqiHistory] = useState([]);

  useEffect(() => {
    // Fetch hourly AQI data
    const fetchAQIHistory = async () => {
      const response = await fetch(
        "https://air-quality-api.open-meteo.com/v1/air-quality?latitude=11.0168&longitude=76.9558&hourly=us_aqi&domains=cams_global"
      );
      const data = await response.json();
      setAqiHistory(data.hourly.us_aqi.slice(0, 5)); // Latest 5 AQI data points
    };

    fetchAQIHistory();
  }, []);

  const data = {
    labels: ["1h ago", "2h ago", "3h ago", "4h ago", "5h ago"],
    datasets: [
      {
        label: "AQI Levels",
        data: aqiHistory,
        borderColor: "#007bff",
        borderWidth: 2,
        pointBackgroundColor: "#007bff",
        pointRadius: 4,
        fill: false,
      },
    ],
  };

  return (
      <div className="aqi-chart-container bg-white shadow-lg rounded-lg p-6">
        <h2 className="aqi-chart-title text-xl font-semibold text-gray-800 mb-4 font-poppins">
          AQI Trends
        </h2>
        <div className="w-full">
          <Line data={data} />
        </div>
      </div>
  );
};

export default AQIChart;
