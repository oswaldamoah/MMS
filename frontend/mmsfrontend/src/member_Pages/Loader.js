import React from 'react';
import './Loader.css';

const Loader = ({ LoaderMessage }) => {
  return (
    <div className="loader-container">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      <div className="loadingspinner">
        <div id="square1"></div>
        <div id="square2"></div>
        <div id="square3"></div>
        <div id="square4"></div>
        <div id="square5"></div>
      </div>
      {LoaderMessage && <p className="loader-message">{LoaderMessage}</p>}
    </div>
  );
};

export default Loader;
