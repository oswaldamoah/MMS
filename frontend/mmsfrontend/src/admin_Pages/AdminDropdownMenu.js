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
        <li onClick={() => onOptionClick('/members')}>Members</li>
        <li onClick={() => onOptionClick('/editAnnouncements')}>Edit Announcements</li>
        <li onClick={() => onOptionClick('/editEvents')}>Edit Events</li>
        <li onClick={() => onOptionClick('/editPaymentInfo')}>Edit Payment Info</li>
        <li onClick={() => onOptionClick('/adminLogs')}>Admin Activity</li>
        <li onClick={() => onOptionClick('/Login')}>LOGOUT</li>
      </ul>
    </div>
  );
}

export default DropdownMenu;
