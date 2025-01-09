import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Image Layer */}
        <div className={`login-image ${isSignUp ? '' : 'slide-right'}`}></div>

        {/* Sign-in and Sign-up forms */}
        <div className="login-content">
          {/* Sign-in Form */}
          <div className={`form-container form-sign-in ${isSignUp ? 'hidden' : ''}`}>
            <h1 className="welcome-back">Welcome Back</h1>
            <p className="instruction">
              Enter your email and password to access your account
            </p>
            <form className="login-form">
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label>Email</label>
                <input type="email" placeholder="Enter your email" required />
              </div>
              <div className="password-container">
                <label>Password</label>
                <input type="password" placeholder="Enter your password" required />
              </div>
              <div className="login-options">
                <a href="/forgot" className="forgot-password">
                  Forgot Password?
                </a>
              </div>
              <button type="submit" className="login-button">
                Sign In
              </button>
            </form>
            <p className="signup-link">
              Don’t have an account?{' '}
              <span onClick={handleSignUpClick} className="switch-back">
                Sign Up
              </span>
            </p>
          </div>

          {/* Sign-up Form */}
          <div className={`form-container form-sign-up ${isSignUp ? 'visible' : ''}`}>
            <h1 className="welcome-back">Join Us</h1>
            <p className="instruction">
              Enter your details to create your account
            </p>
            <form className="login-form">
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label>Category</label>
                <select name="" id="">
                  <option disabled selected>
                    Select Category
                  </option>
                  <option value="">Doctor</option>
                  <option value="">Clinical Assistant</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label>Email</label>
                <input type="email" placeholder="Enter your email" required />
              </div>
              <div className="password-container">
                <label>Password</label>
                <input type="password" placeholder="Enter your password" required />
              </div>
              <div className="login-options">
                <span onClick={handleSignInClick} className="switch-back">
                  Already have an account? Sign In
                </span>
              </div>
              <button type="submit" className="login-button">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
