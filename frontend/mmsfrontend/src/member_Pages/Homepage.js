import React from 'react';
import { useNavigate } from 'react-router-dom';
import './homepage.css';
import MemberHeader from './MemberHeader'; // Import Member Header


const HomePage = () => {
  const navigate = useNavigate();

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <div className="home-container">
      <MemberHeader headertitle="Welcome To Church!"/>
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