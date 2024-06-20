// DropdownMenu.js
import React from 'react';
import './DropdownMenu.css';

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
      </ul>
    </div>
  );
}

export default DropdownMenu;
