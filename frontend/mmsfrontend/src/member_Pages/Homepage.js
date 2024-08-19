import React from 'react';
import { useNavigate } from 'react-router-dom';
import MemberHeader from './MemberHeader';
import AnnouncementsPage from './announcement';
import Location from './location';
import Payment_options from './Payment_options';
import './homepage.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


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
        <div className="section mission touchable-opacity">
          <h3>Our Mission</h3>
          <p>
            To create an enabling environment for the development of selfless and purposeful God-fearing believers.
          </p>
        </div>

        <div className="section vision touchable-opacity">
          <h3>Vision of the Church</h3>
          <p>
            We are committed to being a community where each individual makes themselves and their resources available for God’s use. 
            Our goal is to cultivate balanced Christians who are 
            spiritually sound, physically fit, socially relevant, and financially independent.
          </p>
        </div>

        <div className="section declaration touchable-opacity">
          <h3>Philosophy</h3>
          <p>
            Faith <br></br>
            Hope <br></br>
            Love <br></br>
          </p>
        </div>
      </div>
      <br></br>
      <br></br>

      {/* Icons for navigation */}
      <div className="main-content">
        <div className="icon-container touchable-opacity" onClick={() => handleMenuClick('/events')}>
          <img src="/calender2.png" alt="Events Icon" className="icon" />
          <p>Events</p>
        </div>
        <div className="icon-container touchable-opacity" onClick={() => handleMenuClick('/PaymentOptions')}>
          <img src="/Rectangle.png" alt="Pay Icon" className="icon" />
          <p>Pay</p>
        </div>
      </div>

      {/* Add Location Component */}
      <Location />
      <br/><br/><br/><br/>

      {/* Footer */}
      <div className="footer-container">
  <div className="footer-content">
    <div className="footer-left">
      <p><i className="fas fa-envelope"></i> <a href="mailto:flourishingfulfieldintmin@gmail.com">flourishingfulfieldintmin@gmail.com</a></p>
      <p><i className="fas fa-phone-alt"></i> <a href="tel:+233241884771">0241884771</a> / <a href="tel:+233244987597">0244987597</a></p>
    </div>
    <div className="footer-right">
      <p>© 2024. Flourishing Field International Ministries, All Rights Reserved</p>
      <p>Powered by <a href="https://github.com/Bit-By-Bit-Devs" target="_blank" rel="noopener noreferrer">Bit-By-Bit Developers™</a></p>
    </div>
  </div>
</div>

    </div>
  );
};

export default HomePage;
