import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="home-container">
      {/* Navbar Section */}
      <nav className="navbar">
        <div className="logo">
          <h1>IMSR</h1>
        </div>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/login" className="nav-link">About</Link>
          <Link to="/dashboard" className="nav-link">Contact</Link>
          <motion.div
                className="loginbutton nav-link"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Login
          </motion.div>
        </div>
      </nav>

      {/* Main Content Section */}
      <section className="main-content">
        <header className="main-header">
          <h1>Air Pollution Health Monitoring</h1>
          <p>Monitor patient health and predict diseases related to air pollution.</p>
        </header>

        {/* About the Project Section */}
        <div className="about-project">
          <h2>About the Project</h2>
          <p>
            Air pollution has become a significant concern in modern healthcare, as it can lead to a variety of respiratory and cardiovascular diseases.
            This project aims to leverage data-driven insights to help doctors monitor the health of patients affected by air pollution in real-time.
            Using various health metrics such as SpO2, respiratory rate, and other relevant indicators, this system predicts possible diseases and provides useful
            data for early intervention.
          </p>

          <p>
            <strong>How It Works:</strong>
            <ul>
              <li><strong>Data Collection:</strong> Clinical Assistants (CAs) will monitor patients and collect vital health data, such as SpO2, respiratory rate, etc.</li>
              <li><strong>Data Analysis:</strong> The collected data will be processed using machine learning algorithms to identify potential diseases such as asthma, COPD, or other lung-related conditions.</li>
              <li><strong>Prediction Display:</strong> The system will display disease predictions based on the collected data, helping doctors with diagnosis and treatment plans.</li>
              <li><strong>Doctor's Dashboard:</strong> Doctors can view the predictions and analyze the data in detail to ensure the patient gets proper care.</li>
            </ul>
          </p>
        </div>

        {/* Patient Data Section */}
        <div className="patient-dashboard">
          <h2>Recent Patient Data</h2>
          <div className="patient-info">
            <div className="info-card">
              <h3>Patient 1: John Doe</h3>
              <p><strong>SPO2:</strong> 92%</p>
              <p><strong>Respiratory Rate:</strong> 18 breaths/min</p>
              <p><strong>Prediction:</strong> COPD (80% Confidence)</p>
            </div>
            <div className="info-card">
              <h3>Patient 2: Jane Smith</h3>
              <p><strong>SPO2:</strong> 95%</p>
              <p><strong>Respiratory Rate:</strong> 22 breaths/min</p>
              <p><strong>Prediction:</strong> Asthma (75% Confidence)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2025 HealthMonitor. All Rights Reserved.</p>
        <p>
          <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link> |{" "}
          <Link to="/terms" className="footer-link">Terms & Conditions</Link>
        </p>
      </footer>
    </div>
  );
};

export default Home;