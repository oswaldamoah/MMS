import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DropdownMenu from './DropdownMenu'; 
import styles from './accountManagement.module.css'; 

function AccountManagement() {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Assuming you have a function to get the logged-in user's username
    const loggedInUsername = getLoggedInUsername();
    setUsername(loggedInUsername);
  }, []);

  const getLoggedInUsername = () => {
    // Replace with your logic to get the logged-in user's username
    return localStorage.getItem('username');
  };

  const handleProfileClick = () => {
    navigate('/account-management');
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleMenuOptionClick = (path) => {
    setMenuVisible(false);
    navigate(path);
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      alert('New passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, oldPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Password changed successfully');
      } else {
        alert(data.error || 'Password change failed');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Password change failed');
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (!confirmDelete) return;

    try {
      const response = await fetch('http://localhost:5000/api/delete-account', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Account deleted successfully');
        navigate('/'); // Redirect to the home page or login page after deletion
      } else {
        alert(data.error || 'Account deletion failed');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Account deletion failed');
    }
  };

  const handleCancel = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
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
              <input
                type="password"
                placeholder="Enter old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
            <div className={styles['buttons']}>
              <button onClick={handleChangePassword} className={styles['save-btn']}>SAVE</button>
              <button onClick={handleCancel} className={styles['cancel-btn']}>CANCEL</button>
            </div>
          </div>
        </div>
        <div className={styles['delete-account-section']}>
          <h3>DELETE ACCOUNT</h3>
          <button onClick={handleDeleteAccount} className={styles['delete-btn']}>DELETE</button>
        </div>
      </div>
    </div>
  );
}

export default AccountManagement;
