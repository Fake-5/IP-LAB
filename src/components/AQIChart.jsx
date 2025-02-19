import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
import "./AQIChart.css";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const AQIChart = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "AQI Levels",
        data: [90, 100, 85, 95, 80],
        borderColor: "#007bff",
        borderWidth: 2,
        pointBackgroundColor: "#007bff",
        pointRadius: 4,
        fill: false,
      },
    ],
  };

  return (
    <div className="aqi-chart-container">
      <h2 className="aqi-chart-title">AQI Trends</h2>
      <Line data={data} />
    </div>
  );
};

export default AQIChart;
