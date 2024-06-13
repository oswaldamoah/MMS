import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Ensure your CSS file is still included

function LoginPage() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    console.log('Username:', username);
    console.log('Password:', password);

    if (username === 'Terrence' && password === '12345') {
      navigate('/home');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="container">
      <div className="welcome-section">
        <img src="/logo1.png" alt="FFIM Logo" className="logo" />
        <h1>WELCOME BACK!</h1>
        <p>To stay connected with us, please login with your info.</p>
        <p>Thank You.</p>
      </div>
      <div className="login-section">
        <form className="form-control" onSubmit={handleSubmit}>
          <p className="title">Login</p>
          <div className="input-field">
            <input required className="input" type="text" name="username" />
            <label className="label" htmlFor="input">Enter Username</label>
          </div>
          <div className="input-field">
            <input required className="input" type="password" name="password" />
            <label className="label" htmlFor="input">Enter Password</label>
          </div>
          <button className="submit-btn" type="submit">Sign In</button>
          <p className='signuptext'>ARE YOU NEW HERE?</p>
          <a href="#" className='signup'>SIGN UP!</a>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
