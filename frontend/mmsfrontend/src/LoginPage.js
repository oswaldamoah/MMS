import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
      const response = await fetch('https://mms-0tpv.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        localStorage.setItem('username', username);
        navigate('/memberManagement');
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
      const response = await fetch('https://mms-0tpv.onrender.com/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, passphrase }),
      });

      if (response.ok) {
        alert('Signup successful');
        setIsSignUp(false);
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

  const handleGoHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="container-login">
      {!isSignUp && (
        <div className="welcome-section-login">
          <img src="/logo1.png" alt="FFIM Logo" className="logo-login" />
          <h1>WELCOME BACK!</h1>
          <p>To stay connected with us, please login with your info.</p>
          <p>Thank You.</p>
          <a href="/" className="go-home-link" onClick={handleGoHomeClick}>Home</a> {/* Updated to a link */}
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
    <div className="form-control-login">
      <form onSubmit={handleSubmit}>
        <p className="title-login">Login</p>
        <div className="input-field-login">
          <input required className="input-login" type="text" name="username" />
          <label className="label-login" htmlFor="username">Enter Username</label>
        </div>
        <div className="input-field-login">
          <input required className="input-login" type="password" name="password" />
          <label className="label-login" htmlFor="password">Enter Password</label>
        </div>
        <button className="submit-btn-login" type="submit">Sign In</button>
        <p className="signuptext-login">ARE YOU NEW HERE?</p>
        <button type="button" className="signup-login" onClick={handleSignUpClick}>SIGN UP!</button>
      </form>
    </div>
  );
}

function SignUpSection({ handleSignUpSubmit, handleLoginClick }) {
  return (
    <div className="form-box-login">
      <form onSubmit={handleSignUpSubmit}>
        <p className="title-login">Sign up</p>
        <span className="signuptext-login">Create a free account.</span>
        <div className="input-field-login">
          <input required className="input-login" type="text" name="username" />
          <label className="label-login" htmlFor="username">Username</label>
        </div>
        <div className="input-field-login">
          <input required className="input-login" type="password" name="password" />
          <label className="label-login" htmlFor="password">Password</label>
        </div>
        <div className="input-field-login">
          <input required className="input-login" type="password" name="confirm-password" />
          <label className="label-login" htmlFor="confirm-password">Confirm Password</label>
        </div>
        <div className="input-field-login">
          <input required className="input-login" type="text" name="passphrase" />
          <label className="label-login" htmlFor="passphrase">Special Key</label>
        </div>
        <button className="submit-btn2-login" type="submit">Sign up</button>
      </form>
      <div className="form-section-login">
        <p>Have an account? <button type="button" className="login-link-login" onClick={handleLoginClick}>LOG IN</button></p>
      </div>
    </div>
  );
}

export default LoginPage;
