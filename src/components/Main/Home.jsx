import React from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import "./Home.css";
import Prediction from "../Prediction"

const Home = () => {
  return (
    <div className="home-container">
      <div className="main-content">
        <Header />
        <Sidebar />
      </div>
    </div>
  );
};
export default Home;

