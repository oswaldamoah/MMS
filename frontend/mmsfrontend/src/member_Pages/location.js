import React from 'react';
import './location.css'; 

const Location = () => {
  return (
    <div className="location-container">
      <h3>Location</h3>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d364.5127862141261!2d-0.3256793342961213!3d5.5873033722926335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNcKwMzUnMTQuNSJOIDDCsDE5JzMyLjYiVw!5e1!3m2!1sen!2sgh!4v1722283408419!5m2!1sen!2sgh"
        width="1800"
        height="1350"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Location Map"
      ></iframe>
    </div>
  );
};

export default Location;
