import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DropdownMenu from './MemberDropdownMenu'; // Import the DropdownMenu component
import MemberHeader from './MemberHeader';
import './Payment_options.css';

const PaymentOptions = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMenuOptionClick = (path) => {
    setIsDropdownOpen(false);
    navigate(path);
  };

  return (
    <div className="payment-options-page">
      <div className="payment-options-header">
        <div className="logo-section">
          <img src="/logo1.png" alt="FFIM Logo" className="ffim-logo" />
        </div>
        <div className="header-text">
          <h2>Payment Information</h2>
        </div>
        <div className="menu-icon">
          <button className="dropbtn" onClick={handleMenuClick}>
            <img src="/AdminLogsMenu.png" alt="Menu" />
          </button>
          <DropdownMenu 
            isVisible={isDropdownOpen} 
            onOptionClick={handleMenuOptionClick} 
          />
        </div>
      </div>
      <div className="payment-info-container">
        <div className="payment-info">
          <div className="info-item">
            <span className="info-label">BANK</span>
            <span className="info-value"> : ECOBANK</span>
          </div>
          <div className="info-item">
            <span className="info-label">ACCOUNT NUMBER</span>
            <span className="info-value"> : XXXX XXXX XXXX 4321</span>
          </div>
          <div className="info-item">
            <span className="info-label">ACCOUNT NAME</span>
            <span className="info-value"> : FLOURISHING FIELD INTERNATIONAL MINISTRIES</span>
          </div>
          <div className="info-item">
            <span className="info-label">BRANCH</span>
            <span className="info-value"> : EAST LEGON</span>
          </div>
        </div>
        <div className="payment-methods">
          <img src="/mtn image.png" alt="MTN Mobile Money" className="payment-method-icon" />
          <img src="/vodaphone cash.jpeg" alt="Tigo Cash" className="payment-method-icon" />
          <img src="/visa pic.png" alt="Visa" className="payment-method-icon" />
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
