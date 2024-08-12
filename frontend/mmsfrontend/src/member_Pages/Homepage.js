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

      <AnnouncementsPage />

      {/* Section for Mission, Vision, and Declaration */}
      <div className="info-sections">
        <div className="section mission">
          <h3>Mission of the Church</h3>
          <p>
            Our mission is to spread the love of God, provide spiritual guidance,
            and serve our community with compassion and integrity.
          </p>
        </div>

        <div className="section vision">
          <h3>Vision of the Church</h3>
          <p>
            We envision a community where every individual experiences the
            transformative power of God's love and grows in faith, hope, and service.
          </p>
        </div>

        <div className="section declaration">
          <h3>Declaration</h3>
          <p>
            We declare our faith in God Almighty, our commitment to His teachings, and
            our dedication to living out His word in every aspect of our lives.
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
