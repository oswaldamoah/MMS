// DropdownMenu.js
import React from 'react';
import './dropdownMenu.css';

function DropdownMenu({ isVisible, onOptionClick }) {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="dropdown-menu">
      <ul>
        <li onClick={() => onOptionClick('/home')}>HOME</li>
        <li onClick={() => onOptionClick('/editEvents')}>EVENTS</li>
        <li onClick={() => onOptionClick('/pay')}>PAY</li>
        <li onClick={() => onOptionClick('/editAnnouncements')}>Edit Announcement</li>
      </ul>
    </div>
  );
}

export default DropdownMenu;
