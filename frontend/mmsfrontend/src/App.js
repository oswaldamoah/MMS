import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import LoginPage from './LoginPage';
import Admin_Logs from './admin_Pages/adminLogs';
import AccountManagement from './admin_Pages/accountManagement';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/Login');
  };

  return (
    <>
      <div className='background'>
        <div className='header'>
          <div className="logo-container">
            <img src="/ffim.jpg" alt="FFIM Logo" className="ffim" />
          </div>
          <h1 className="header-title">FLOURISHING FIELD INTERNATIONAL MINISTRIES</h1>
        </div>
        <div className='translucent-box'>
          <img src="/whoareyou.png" alt="Who are you" className='whoareyou' />
          <div className='membersection'>
            <div>
              <div className="role-icon-container">
                <button className='memberbutton'>
                  <img src="/member.png" alt="Member Icon" className="role-icon" />
                </button>
              </div>
              <div className='member'>
                <h1>MEMBER</h1>
              </div>
            </div>
            <div className='adminsection'>
              <div className="admincontainer">
                <button className='adminbutton' onClick={handleAdminClick}>
                  <img src="/ad.png" alt="Administrator Icon" className="adminicon" />
                </button>
              </div>
              <h1 className='Admintext'>ADMINISTRATOR</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/admin_Logs" element={<Admin_Logs />} />
        <Route path="/account-management" element={<AccountManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
