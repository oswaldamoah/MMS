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
        <li onClick={() => onOptionClick('/adminLogs')}>Home</li>
        <li onClick={() => onOptionClick('/memberManagement')}>Member Management</li>
        <li onClick={() => onOptionClick('/editEvents')}>Events</li>
        <li onClick={() => onOptionClick('/editPaymentOptions')}>Payment Options</li>
        <li onClick={() => onOptionClick('/editAnnouncements')}>Announcement</li>
        <li onClick={() => onOptionClick('../Login')}>Log Out</li>
      </ul>
    </div>
  );
}

export default DropdownMenu;
