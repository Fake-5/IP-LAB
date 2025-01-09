import { React,useEffect,useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { motion } from "framer-motion";
import med from "../images/med.jpg";
import logo from "../images/logo.png";
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import HeartIcon from '@mui/icons-material/Favorite';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import InsightsIcon from '@mui/icons-material/Insights';
import ScoreIcon from '@mui/icons-material/Score';

const Home = () => {
  const testsAndAlgorithms = [
    {
      title: "Test: SpO2 Monitoring",
      description: "Measures blood oxygen levels to detect hypoxemia and related issues.",
      icon: <BloodtypeIcon style={{ fontSize: 40, color: "green" }} />
    },
    {
      title: "Test: Respiratory Rate",
      description: "Tracks breathing patterns to identify irregularities or breathing difficulties.",
      icon: <HeartIcon style={{ fontSize: 40, color: "red" }} />,
    },
    {
      title: "Test: Heart Rate Variability",
      description: "Analyzes heart rate patterns to detect cardiovascular abnormalities.",
      icon: <MonitorHeartIcon style={{ fontSize: 40, color: "red" }} />,
    },
    {
      title: "ML Algorithm: Disease Prediction",
      description: "Uses supervised machine learning to identify diseases like asthma, COPD, and lung infections.",
      icon: <InsightsIcon style={{ fontSize: 40, color: "purple" }} />,
    },
    {
      title: "ML Algorithm: Risk Scoring",
      description: "Provides a risk score for potential health conditions based on collected data.",
      icon: <ScoreIcon style={{ fontSize: 40, color: "orange" }} />,
    },
  ];
  const carouselRef = useRef(null);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (carouselRef.current) {
        const firstChild = carouselRef.current.firstElementChild;
        carouselRef.current.style.transition = "transform 1s ease";
        carouselRef.current.style.transform = `translateX(-${firstChild.offsetWidth}px)`;

        setTimeout(() => {
          carouselRef.current.style.transition = "none";
          carouselRef.current.style.transform = "translateX(0)";
          carouselRef.current.appendChild(firstChild);
        }, 1000); // Match the transition duration
      }
    }, 5000); // Change every 5 seconds

    return () => clearInterval(scrollInterval);
  }, []);
  return (
    <div className="home-container">
      {/* Navbar Section */}
      <div className="homebody">
        <nav className="navbar">
          <div className="logo">
            <img src={logo} alt="" height={90} style={{ position: "absolute" }} />
            <h1 className="title">IMSR</h1>
          </div>
          <div className="navbar-links">
            <p to="/" className="nav-link">Home</p>
            <p to="/login" className="nav-link">About</p>
            <p to="/dashboard" className="nav-link">Contact</p>
            <Link to="login" style={{textDecoration:'none'}}>
            <motion.div
              className="loginbutton"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Login
            </motion.div>
            </Link>
          </div>
        </nav>

        {/* Main Content Section */}
        <section className="main-content">
          <header className="main-header">
            <div>
              <h1>
                Air Pollution <span style={{ color: "green", fontSize: 45 }}>Health</span> Monitoring
              </h1>
              <p>Monitor patient health and predict diseases related to air pollution.</p>
            </div>
            <div>
              <img src={med} alt="" height="350" className="homeimg" />
            </div>
          </header>

          {/* About the Project Section */}
          <div className="about-carousel">
            <h2>About the Project</h2>
            <div className="carousel-container">
              <div className="carousel" ref={carouselRef}>
                {testsAndAlgorithms.map((item, index) => (
                  <div className="carousel-box" key={index}>
                    <div className="icon-container">{item.icon}</div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <footer className="footer">
            <p>&copy; 2025 HealthMonitor. All Rights Reserved.</p>
            <p>
              <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link> |{" "}
              <Link to="/terms" className="footer-link">Terms & Conditions</Link>
            </p>
          </footer>
        </section>
      </div>
    </div>
  );
};

export default Home;
