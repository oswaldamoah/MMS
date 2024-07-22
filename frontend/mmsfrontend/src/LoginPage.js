import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import './admin_Pages/adminLogs'

function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

 // In LoginPage.js
const handleLoginSubmit = async (event) => {
  event.preventDefault();
  const username = event.target.username.value;
  const password = event.target.password.value;

  try {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      // Store the username in localStorage upon successful login
      localStorage.setItem('username', username);
      navigate('/Admin_Logs');
    } else {
      const data = await response.json();
      alert(data.error || 'Login failed');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    alert('Login failed');
  }
};

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const confirmPassword = event.target['confirm-password'].value;
    const passphrase = event.target.passphrase.value;
  
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, passphrase }),
      });
  
      if (response.ok) {
        // Handle successful signup
        alert('Signup successful');
        setIsSignUp(false); // Redirect to login after successful signup
      } else {
        const data = await response.json();
        alert(data.error || 'Signup failed');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Signup failed');
    }
  };
  

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleLoginClick = () => {
    setIsSignUp(false);
  };

  return (
    <div className="container">
      {!isSignUp && (
         <div className="welcome-section">
        <img src="/logo1.png" alt="FFIM Logo" className="logo" />
        <h1>WELCOME BACK!</h1>
        <p>To stay connected with us, please login with your info.</p>
        <p>Thank You.</p>
      </div>
      )}
      {isSignUp ? (
        <SignUpSection handleSignUpSubmit={handleSignUpSubmit} handleLoginClick={handleLoginClick} />
      ) : (
        <LoginSection handleSubmit={handleLoginSubmit} handleSignUpClick={handleSignUpClick} />
      )}
    </div>
  );
}

function LoginSection({ handleSubmit, handleSignUpClick }) {
  return (
    <div className="login-section">
      <form className="form-control" onSubmit={handleSubmit}>
        <p className="title">Login</p>
        <div className="input-field">
          <input required className="input" type="text" name="username" />
          <label className="label" htmlFor="username">Enter Username</label>
        </div>
        <div className="input-field">
          <input required className="input" type="password" name="password" />
          <label className="label" htmlFor="password">Enter Password</label>
        </div>
        <button className="submit-btn" type="submit">Sign In</button>
        <p className="signuptext">ARE YOU NEW HERE?</p>
        <button type="button" className="signup" onClick={handleSignUpClick}>SIGN UP!</button>
      </form>
    </div>
  );
}

function SignUpSection({ handleSignUpSubmit, handleLoginClick }) {
  return (
    <div className="form-box">
      <form className="form" onSubmit={handleSignUpSubmit}>
        <p className="title">Sign up</p>
        <span className="subtitle">Create a free account.</span>
        <div className="input-field">
          <input required className="input" type="text" name="username" placeholder="" />
          <label className="label" htmlFor="username">Username</label>
        </div>
        <div className="input-field">
          <input required className="input" type="password" name="password" placeholder="" />
          <label className="label" htmlFor="password">Password</label>
        </div>
        <div className="input-field">
          <input required className="input" type="password" name="confirm-password" placeholder="" />
          <label className="label" htmlFor="confirm-password">Confirm Password</label>
        </div>
        <div className="input-field">
          <input required className="input" type="text" name="passphrase" placeholder="" />
          <label className="label" htmlFor="passphrase">Special Key</label>
        </div>
        <button className="submit-btn2" type="submit">Sign up</button>
      </form>
      <div className="form-section">
        <p>Have an account? <button type="button" className="login-link" onClick={handleLoginClick}>Log in</button></p>
      </div>
    </div>
  );
}


export default LoginPage;