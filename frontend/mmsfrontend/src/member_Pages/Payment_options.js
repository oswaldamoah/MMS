import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MemberHeader from './MemberHeader'; // Import MemberHeader
import DropdownMenu from './MemberDropdownMenu'; // Import DropdownMenu component
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
      <MemberHeader headertitle="Payment Information" />

      <div className="payment-info-container">      <br></br>

      <br></br>
      <br></br>
      <br></br>

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
          <img src="/pay.png" alt="MTN Mobile Money" className="payment-method-icon" />
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
