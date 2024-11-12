// src/SignUpPage/SignUp.jsx
import React, { useState } from 'react';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [signUpError, setSignUpError] = useState(''); // To store any signup errors

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    let valid = true;

    // Basic username validation
    if (!username) {
      setUsernameError('Username is required');
      valid = false;
    } else {
      setUsernameError('');
    }

    // Basic email validation
    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else {
      setEmailError('');
    }

    // Basic password validation
    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }

    // Proceed if inputs are valid
    if (valid) {
      try {
        const response = await axios.post("http://localhost:5000/signup", {
          username,
          email,
          password,
        });

        if (response.status === 201) {
          // Successful signup, save username to localStorage and redirect to user page
          localStorage.setItem('username', username); // Store username in localStorage
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
          navigate('/userpage', { state: { username } }); // Pass username to UserPage
        } else if (response.data === "User already exists") {
          setSignUpError("User already exists. Please log in.");
        } else {
          setSignUpError("An error occurred during sign up.");
        }
      } catch (error) {
        console.error("Error during sign up:", error);
        // Check for error response from server
        if (error.response && error.response.data) {
          setSignUpError(error.response.data); // Use error message from server
        } else {
          setSignUpError("An error occurred during sign up.");
        }
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>Create an Account</h2>
      <div className="signup-form-background">
        <form className="signup-form" onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Username"
            className="signup-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {usernameError && <span className="errorLabel">{usernameError}</span>}
          <input
            type="email"
            placeholder="Email"
            className="signup-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <span className="errorLabel">{emailError}</span>}
          <input
            type="password"
            placeholder="Password"
            className="signup-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <span className="errorLabel">{passwordError}</span>}
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        {signUpError && <span className="errorLabel">{signUpError}</span>} {/* Display signup error */}
      </div>
      <p>Already have an account? <Link to="/login" style={{ color: 'red' }}>Login</Link></p>
    </div>
  );
};

export default SignUp;