// AccountManagement.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DropdownMenu from './dropdownMenu'; // Import DropdownMenu component
import styles from './accountManagement.module.css'; // Import CSS module

function AccountManagement() {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleProfileClick = () => {
    navigate('/account-management');
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleMenuOptionClick = (path) => {
    setMenuVisible(false); // Close the menu after an option is clicked
    navigate(path);
  };

  return (
    <div className={styles['account-management-container']}>
      <div className={styles['account-management-header']}>
        <div className={styles['logo-section']}>
          <img src="/logo1.png" alt="FFIM Logo" className={styles['ffim-logo']} />
        </div>
        <h2 className={styles['account-management-title']}>Account Management</h2>
        <div className="profile-section">
          <button onClick={handleProfileClick} className={styles['profile-button']}>
            <img src="/AdminLogsprofile.png" alt="Profile Icon" className={styles['profile-icon']} />
          </button>
          <button onClick={toggleMenu} className={styles['menu-button']}>
            <img src="/AdminLogsMenu.png" alt="Menu" className={styles['menu-icon']} />
          </button>
          <DropdownMenu isVisible={menuVisible} onOptionClick={handleMenuOptionClick} />
        </div>
      </div>
      <div className={styles['account-management-content']}>
        <div className={styles['change-password-section']}>
          <div className={styles['text-side']}>
            <h3>CHANGE PASSWORD</h3>
            <p>Passwords Must Contain:</p>
            <ul>
              <li>At least 6 characters</li>
              <li>At least 1 upper case letter [A-Z]</li>
              <li>At least 1 lower case letter [a-z]</li>
              <li>At least 1 number [0-9]</li>
            </ul>
          </div>
          <div className={styles['input-side']}>
            <div className={styles['password-inputs']}>
              <input type="password" placeholder="Enter old password" />
              <input type="password" placeholder="Enter new password" />
              <input type="password" placeholder="Confirm new password" />
            </div>
            <div className={styles['buttons']}>
              <button className={styles['save-btn']}>SAVE</button>
              <button className={styles['cancel-btn']}>CANCEL</button>
            </div>
          </div>
        </div>
        <div className={styles['delete-account-section']}>
          <h3>DELETE ACCOUNT</h3>
          <button className={styles['delete-btn']}>DELETE</button>
        </div>
      </div>
    </div>
  );
}

export default AccountManagement;
