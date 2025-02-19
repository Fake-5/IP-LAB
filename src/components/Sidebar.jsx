import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h1 className="sidebar-title">AQI Tracker</h1>
      <ul className="sidebar-menu">
        <li className="sidebar-item">Dashboard</li>
        <li className="sidebar-item">Compare Cities</li>
        <li className="sidebar-item">Historical Data</li>
      </ul>
    </div>
  );
};

export default Sidebar;
