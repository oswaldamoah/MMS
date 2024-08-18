import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DropdownMenu from './AdminDropdownMenu';
import styles from './adminHeader.module.css';



function AdminHeader({ headertitle }) {
  const navigate = useNavigate();
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleProfileClick = () => {
    navigate('/account');
  };

  const handleMenuClick = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleOptionClick = (path) => {
    setDropdownVisible(false);
    navigate(path);
  };

  const handleLogoClick = () => {
    navigate('/memberManagement');
  };

  return (
    <div className={styles['admin-header']}>
      <div className={styles['logo-section']} onClick={handleLogoClick}>
        <img src="/logo1.png" alt="FFIM Logo" className={styles['ffim-logo']} />
      </div>
      <h2 className={styles['header-title']}>{headertitle}</h2>
      <div className={styles['profile-section']}>
        <button onClick={handleProfileClick} className={styles['profile-button']}>
          <img src="/AdminLogsProfile.png" alt="Profile Icon" className={styles['profile-icon']} />
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
