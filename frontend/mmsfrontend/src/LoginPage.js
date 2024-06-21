import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import './admin_Pages/adminLogs'

function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    console.log('Username:', username);
    console.log('Password:', password);

    if (username === 'Terrence' && password === '12345') {
      navigate('/Admin_Logs');
    } else {
      alert('Invalid username or password');
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
        <SignUpSection handleLoginClick={handleLoginClick} />
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

function SignUpSection({ handleLoginClick }) {
  return (
    <div className="form-box">
      <form className="form">
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
        <button className="submit-btn2" type="submit">Sign up</button>
      </form>
      <div className="form-section">
        <p>Have an account? <button type="button" className="login-link" onClick={handleLoginClick}>Log in</button></p>
      </div>
    </div>
  );
}

export default LoginPage;
