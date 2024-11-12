// src/LoginPage/Login.jsx
import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  // Validate form fields
  const validateForm = () => {
    let valid = true;
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Email is required');
      valid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    }

    return valid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate the form before making the API request
    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      const { token, username } = response.data;

      // Store user information in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);
      localStorage.setItem('jwtToken', response.data.token);

      // Redirect to user page
      navigate('/userpage');
    } catch (error) {
      // Handle error from API
      setLoginError(error.response?.data?.message || 'Error logging in');
    }
  };

  return (
    <div className="login-container">
      <h2>Login to Your Account</h2>
      <div className="login-form-background">
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <span className="errorLabel">{emailError}</span>}

          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <span className="errorLabel">{passwordError}</span>}

          {loginError && <span className="errorLabel">{loginError}</span>}
          <button onClick={() => navigate('/reset-password')} className="forgot-password-button">
            Forgot Password?
          </button>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
      <p>Don't have an account? <Link to="/signup" style={{ color: 'red' }}>Sign Up</Link></p>
    </div>
  );
};

export default Login;