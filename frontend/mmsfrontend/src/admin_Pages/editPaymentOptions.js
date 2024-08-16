import React, { useState, useEffect } from 'react';
import './editPaymentOptions.css';
import AdminHeader from './AdminHeader.js';

const EditPaymentOptions = () => {
  const [paymentOption, setPaymentOption] = useState('');
  const [paymentDetails, setPaymentDetails] = useState('');
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Fetch payment options when the component mounts
  useEffect(() => {
    const fetchPaymentOptions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/payment-info');
        if (!response.ok) {
          throw new Error('Failed to fetch payment options');
        }
        const data = await response.json();
        setPaymentOptions(data);
      } catch (error) {
        console.error('Error fetching payment options:', error);
      }
    };

    fetchPaymentOptions();
  }, []);

  // Handle saving payment info
  const handleSavePaymentInfo = async (e) => {
    e.preventDefault();
    const newPaymentInfo = {
      paymentOption,
      paymentDetails,
      createdAt: new Date().toISOString(), // Store date in ISO string format
    };

    try {
      const response = await fetch('http://localhost:5000/api/payment-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPaymentInfo),
      });
      if (!response.ok) {
        throw new Error('Failed to save payment option');
      }
      const savedOption = await response.json();
      setPaymentOptions([...paymentOptions, savedOption]);
      setPaymentOption('');
      setPaymentDetails('');
    } catch (error) {
      console.error('Error saving payment option:', error);
    }
  };

  // Handle deleting a payment option
  const handleDeletePaymentOption = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/payment-info/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete payment option');
      }
      const newPaymentOptions = paymentOptions.filter(option => option._id !== id);
      setPaymentOptions(newPaymentOptions);
    } catch (error) {
      console.error('Error deleting payment option:', error);
    }
  };

  // Toggle modal visibility
  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="container">
      <AdminHeader headertitle={"Payment Options"} />
      <main>
        <form className="form" onSubmit={handleSavePaymentInfo}>
          <fieldset className="fieldset">
            <legend className="legend">
              Payment Information
              <img 
                src="/info.png" 
                alt="Info" 
                className="info-icon" 
                onClick={handleToggleModal}
              />
            </legend>
            <input
              type="text"
              className="input"
              placeholder="Payment Option"
              value={paymentOption}
              onChange={(e) => setPaymentOption(e.target.value)}
              required
            />
            <textarea
              className="textarea"
              placeholder="Payment Details"
              value={paymentDetails}
              onChange={(e) => setPaymentDetails(e.target.value)}
              required
            ></textarea>
          </fieldset>
          <button type="submit" className="saveButton">SAVE</button>
        </form>
        <h2 className="paymentOptionsTitle">PAYMENT OPTIONS</h2>
        <table className="paymentOptionsTable">
          <thead>
            <tr>
              <th>PAYMENT OPTION</th>
              <th>PAYMENT DETAILS</th>
              <th>DATE ADDED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {paymentOptions.map((option) => (
              <tr key={option._id}>
                <td>{option.paymentOption}</td>
                <td>{option.paymentDetails}</td>
                <td>{new Date(option.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className="deleteButton"
                    onClick={() => handleDeletePaymentOption(option._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showModal && (
          <div className="info-overlay">
            <div className="info-modal">
              <span className="close-button" onClick={handleToggleModal}>❌</span>
              <h3>Instructions</h3>
              <p>For Payment Description content</p>
              <p><strong>*text*</strong> makes text bold.</p>
              <p><code>`text`</code> makes text copiable.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default EditPaymentOptions;
