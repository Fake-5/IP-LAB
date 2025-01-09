import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-image"></div>
        <div className="login-content">
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
              <a href="/forgot" className="forgot-password">
                Forgot Password?
              </a>
            </div>
            <button type="submit" className="login-button">Sign In</button>
          </form>
          <p className="signup-link">
            Don’t have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
