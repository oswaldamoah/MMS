// AdminHeader.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DropdownMenu from './AdminDropdownMenu'; // Import DropdownMenu
import styles from './adminHeader.module.css'; // Use a separate CSS module for AdminHeader

function AdminHeader({ headertitle }) {
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
    <div className={styles['admin-header']}>
      <div className={styles['logo-section']}>
        <img src="/logo1.png" alt="FFIM Logo" className={styles['ffim-logo']} />
      </div>
      <h2 className={styles['header-title']}>{headertitle}</h2>
      <div className={styles['profile-section']}>
        <button onClick={handleProfileClick} className={styles['profile-button']}>
          <img src="/AdminLogsprofile.png" alt="Profile Icon" className={styles['profile-icon']} />
        </button>
        <button onClick={handleMenuClick} className={styles['menu-button']}>
          <img src="/AdminLogsMenu.png" alt="Menu" className={styles['menu-icon']} />
        </button>
        <DropdownMenu isVisible={isDropdownVisible} onOptionClick={handleOptionClick} />
      </div>
    </div>
  );
}

export default AdminHeader;
