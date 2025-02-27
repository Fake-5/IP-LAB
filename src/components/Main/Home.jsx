import React from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import "./Home.css";

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

