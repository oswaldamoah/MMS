import React from 'react';
import { useNavigate } from 'react-router-dom';
import MemberHeader from './MemberHeader';
import Loader from './Loader';
import Footer from './Footer';
import './Payment_options.css';

const PaymentOptions = ({ paymentOptions, loading, error }) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMenuOptionClick = (path) => {
    setIsDropdownOpen(false);
    navigate(path);
  };

  const formatDetails = (details) => {
    // Replace bold markers with <strong> tags
    let formattedText = details.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
    // Replace code block markers with <code> tags and add a click handler
    formattedText = formattedText.replace(/`(.*?)`/g, '<code class="copy-text" data-clipboard="$1">$1</code>');
    return formattedText;
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    });
  };

  const handleCodeClick = (event) => {
    const text = event.target.getAttribute('data-clipboard');
    if (text) {
      handleCopy(text);
    }
  };

  return (
    <div className="payment-options-page">
      <MemberHeader headertitle="Payment Information" />
      <br /><br /><br /><br />
      <div className="payment-info-container">
        {loading ? (
          <Loader LoaderMessage="Loading payment options..." />
        ) : error ? (
          <p>{error}</p>
        ) : paymentOptions.length > 0 ? (
          paymentOptions.map(option => (
            <div key={option._id} className="payment-info-section">
              <h2 className="payment-option-title">{option.paymentOption}</h2>
              <p className="payment-option-details">
                {option.paymentDetails.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    <span
                      dangerouslySetInnerHTML={{ __html: formatDetails(line) }}
                      onClick={handleCodeClick}
                    />
                    <br />
                  </React.Fragment>
                ))}
              </p>
              <hr className="section-divider" />
            </div>
          ))
        ) : (
          <p>No payment options available</p>
        )}
      </div>
      <div className="payment-image-container">
        <img src="/pay.png" alt="Payment" className="payment-image" />
      </div>
    </div>
  );
};

export default PaymentOptions;
