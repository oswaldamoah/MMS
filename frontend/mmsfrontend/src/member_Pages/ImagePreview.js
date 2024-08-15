import React from 'react';
import './ImagePreview.css'; // Import the CSS for styling

const ImagePreview = ({ imageSrc, onClose }) => {
  return (
    <div className="image-preview-overlay" onClick={onClose}>
      <div className="image-preview-container">
        <img src={imageSrc} alt="Event Preview" className="image-preview" />
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ImagePreview;
