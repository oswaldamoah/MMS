import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DropdownMenu from './MemberDropdownMenu'; // Import DropdownMenu
import styles from './memberHeader.module.css'; // Use a separate CSS module for AdminHeader

function MemberHeader({ headertitle }) {
  const navigate = useNavigate();
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  // Navigate to the Member Database page when the logo is clicked
  const handleLogoClick = () => {
    navigate('/');
  };

 
  // Toggle the dropdown menu visibility
  const handleMenuClick = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  // Navigate to the selected path and close the dropdown menu
  const handleOptionClick = (path) => {
    setDropdownVisible(false);
    navigate(path);
  };

  return (
    <div className={styles['admin-header']}>
      {/* Logo Section */}
      <div className={styles['logo-section']} onClick={handleLogoClick}>
        <img src="/logo1.png" alt="FFIM Logo" className={styles['ffim-logo']} />
      </div>

      {/* Header Title */}
      <h2 className={styles['header-title']}>{headertitle}</h2>

     

        {/* Menu Icon Button */}
        <button onClick={handleMenuClick} className={styles['menu-button']}>
          <img src="/AdminLogsMenu.png" alt="Menu" className={styles['menu-icon']} />
        </button>

        {/* Dropdown Menu */}
        <DropdownMenu isVisible={isDropdownVisible} onOptionClick={handleOptionClick} />
      </div>
    </div>
  );
}

export default MemberHeader;
