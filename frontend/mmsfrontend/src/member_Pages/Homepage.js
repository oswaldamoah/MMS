import React from 'react';
import { useNavigate } from 'react-router-dom';
import MemberHeader from './MemberHeader';
import AnnouncementsPage from './announcement';
import Location from './location';
import Payment_options from './Payment_options'
import './homepage.css';

const HomePage = () => {
  const navigate = useNavigate();

  // Function to handle navigation
  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <div className="home-container">
      {/* Main header for the page */}
      <MemberHeader headertitle="Welcome To Church!" />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>


      <AnnouncementsPage />

      {/* Section for Mission, Vision, and Declaration */}
      <div className="info-sections">
        <div className="section mission">
          <h3>Our Mission</h3>
          <p>
          To create an enabling environment for the development of selfless and purposeful God-fearing believers.

          </p>
        </div>

        <div className="section vision">
          <h3>Vision of the Church</h3>
          <p>
          We are committed to being a community where each individual makes themselves and their resources available for God’s use. 
          Our goal is to cultivate balanced Christians who are 
          spiritually sound, physically fit, socially relevant, and financially independent.
          </p>
        </div>

        <div className="section declaration">
          <h3>Philosophy</h3>
          <p>
            Faith <br></br>
            Hope <br></br>
            Love <br></br>
          </p>
        </div>
      </div>

      {/* Icons for navigation */}
      <div className="main-content">
        <div className="icon-container" onClick={() => handleMenuClick('/events')}>
          <img src="/calender2.png" alt="Events Icon" className="icon" />
          <p>Events</p>
        </div>
        <div className="icon-container" onClick={() => handleMenuClick('/PaymentOptions')}>
          <img src="/Rectangle.png" alt="Pay Icon" className="icon" />
          <p>Pay</p>
        </div>
      </div>

      {/* Add Location Component */}
      <Location />

    </div>
  );
};

export default HomePage;
