import React from 'react';
import { useNavigate } from 'react-router-dom';
import './homepage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <img src="/ffim.jpg" alt="FFIM Logo" className="home-logo" />
        <h1 className="home-title">Welcome to Church!</h1>
        <div className="menu-icon">
          <div className="dropdown">
            <button className="dropbtn">
              <img src="/menu_icon.png" alt="Menu Icon" />
            </button>
            <div className="dropdown-content">
              <button onClick={() => handleMenuClick('/')}>HOME</button>
              <button onClick={() => handleMenuClick('/events')}>EVENTS</button>
              <button onClick={() => handleMenuClick('/pay')}>PAY</button>
            </div>
          </div>
        </div>
      </header>
      <div className="main-content">
        <div className="icon-container" onClick={() => handleMenuClick('/events')}>
          <img src="/events_icon.png" alt="Events Icon" className="icon" />
          <p>Events</p>
        </div>
        <div className="icon-container" onClick={() => handleMenuClick('/pay')}>
          <img src="/pay_icon.png" alt="Pay Icon" className="icon" />
          <p>Pay</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;