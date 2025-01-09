import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className="login-container">
      <div className="login-left">
        <div className="quote-section">
          
        </div>
      </div>
      <div className="login-right">
        <div className="logo">IMSR</div>
        <h1 className="welcome-back">Welcome Back</h1>
        <p className="instruction">Enter your email and password to access your account</p>
        <form className="login-form">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />
          <label>Password</label>
          <div className="password-container">
            <input type="password" placeholder="Enter your password" required />
          </div>
          <div className="login-options">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#" className="forgot-password">
              Forgot Password?
            </a>
          </div>
          <button type="submit" className="login-button">Sign In</button>
          <button className="google-login">
            <img src="google-icon.png" alt="Google" /> Sign In with Google
          </button>
        </form>
        <p className="signup-link">
          Don’t have an account? <a href="#">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
