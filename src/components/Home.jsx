import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Dashboard from "../components/DashBoard";
import AQITrend from "../components/AQITrend"
import "./Home.css";
const Home = () => {
  return (
    <div className="home-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <Dashboard />
        <AQITrend />
      </div>
    </div>
  );
};
export default Home;