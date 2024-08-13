// DropdownMenu.js
import React from 'react';
import './MemberDropdownMenu.css';

function DropdownMenu({ isVisible, onOptionClick }) {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="dropdown-menu">
      <ul>
        <li onClick={() => onOptionClick('/Homepage')}>HOME</li>
        <li onClick={() => onOptionClick('/events')}>EVENTS</li>
        <li onClick={() => onOptionClick('/PaymentOptions')}>PAY</li>
      </ul>
    </div>
  );
}

export default DropdownMenu;
