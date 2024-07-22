import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';
import './adminLogs.css';
import './DropdownMenu.css'; // Ensure the CSS for the dropdown menu is included

function AdminLogs() {
  const navigate = useNavigate();
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleProfileClick = () => {
    navigate('/account-management');
  };

  const handleMenuClick = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleOptionClick = (path) => {
    setDropdownVisible(false);
    navigate(path);
  };

  return (
    <div className="admin-logs-page">
      <div className="admin-logs-header">
        <div className="logo-section">
          <img src="/logo1.png" alt="FFIM Logo" className="ffim-logo" />
        </div>
        <div className="headertext"><h2>Admin Logs</h2></div>
        <div className="profile-section">
          <button onClick={handleProfileClick} className="profile-button">
            <img src="/AdminLogsprofile.png" alt="Profile Icon" className="profile-icon" />
          </button>
          <button onClick={handleMenuClick} className="menu-button">
            <img src="/AdminLogsMenu.png" alt="Menu" className="menu-icon" />
          </button>
          <DropdownMenu isVisible={isDropdownVisible} onOptionClick={handleOptionClick} />
        </div>
      </div>
      <div className="admin-logs-table-container">
        <table>
          <thead>
            <tr>
              <th>USER</th>
              <th>ACTIVITY</th>
              <th>TIME</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>dapaahlarry</td>
              <td>Created Account</td>
              <td>11-Jun-2024 20:00</td>
            </tr>
            <tr>
              <td>james12</td>
              <td>Logged In</td>
              <td>11-Jun-2024 22:17</td>
            </tr>
            <tr>
              <td>james12</td>
              <td>Logged Out</td>
              <td>12-Jun-2024 00:47</td>
            </tr>
            <tr>
              <td>dapaahlarry</td>
              <td>Logged Out</td>
              <td>12-Jun-2024 02:56</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminLogs;