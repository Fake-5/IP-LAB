import React from "react";

const Prediction = ({
  city = "Unknown",
  aqi = 0,
  healthScore = 50,
  risks = [],
  measures = [],
}) => {
  const getHealthStatus = (score) => {
    if (score <= 30) return { label: "Good", color: "bg-green-500", text: "text-green-900" };
    if (score <= 60) return { label: "Moderate", color: "bg-orange-500", text: "text-orange-900" };
    return { label: "Poor", color: "bg-red-500", text: "text-red-900" };
  };

  const { label, color, text } = getHealthStatus(healthScore);

  return (
    <div className="ml-[250px] min-h-screen bg-gray-100 p-6">
      {/* Header (With Gap) */}
      <div className="w-full bg-gray-900 text-white flex items-center justify-center py-6 shadow-md mt-6 rounded-lg">
        <h1 className="text-2xl font-bold">Disease Prediction & Prevention</h1>
      </div>

      {/* Main Content */}
      <div className="mt-6">
        <h1 className="text-2xl font-bold">{city}</h1>

        {/* Health Score Section (Larger & More Emphasis) */}
        <div className={`w-full shadow-md rounded-lg p-6 mt-6 ${color} text-white`}>
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-xl">Predicted Health Score</h2>
            <button className="bg-gray-800 text-white px-4 py-2 rounded text-sm shadow">Refresh</button>
          </div>
          <div className="flex flex-col items-center justify-center mt-6">
            <div className="w-24 h-24 flex items-center justify-center text-3xl font-bold bg-white text-black rounded-full shadow-md">
              {healthScore}%
            </div>
            <span className="text-lg font-semibold mt-3">{label}</span>
          </div>
          <p className="text-center mt-3">
            {label === "Good"
              ? "Air quality is good. Enjoy outdoor activities."
              : label === "Moderate"
              ? "Air quality is moderate. Some risks for sensitive individuals."
              : "Air quality is poor. High risk of respiratory diseases."}
          </p>
        </div>

        {/* Potential Risks Section */}
        <div className="w-full bg-white shadow-md rounded-lg p-5 mt-6">
          <h2 className="font-bold text-lg text-gray-800">Potential Risks</h2>
          {risks.length > 0 ? (
            <ul className="list-disc pl-5 text-gray-700 mt-2">
              {risks.map((risk, index) => (
                <li key={index}>{risk}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-2">• Respiratory issues like asthma and bronchitis</p>
          )}
        </div>

        {/* Preventive Measures Section */}
        <div className="w-full bg-white shadow-md rounded-lg p-5 mt-6 mb-6">
          <h2 className="font-bold text-lg text-gray-800">Preventive Measures</h2>
          {measures.length > 0 ? (
            <ul className="list-disc pl-5 text-gray-700 mt-2">
              {measures.map((measure, index) => (
                <li key={index}>{measure}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-2">• Wear a mask, avoid outdoor exposure, and use air purifiers.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Prediction;
