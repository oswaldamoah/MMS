// DropdownMenu.js
import React from 'react';
import './AdminDropdownMenu.css';

function DropdownMenu({ isVisible, onOptionClick }) {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="dropdown-menu">
      <ul>
        <li onClick={() => onOptionClick('/home')}>HOME</li>
        <li onClick={() => onOptionClick('/events')}>EVENTS</li>
        <li onClick={() => onOptionClick('/pay')}>PAY</li>
        <li onClick={() => onOptionClick('/Login')}>LOGOUT</li>
      </ul>
    </div>
  );
}

export default DropdownMenu;