import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import LoginPage from './LoginPage';
import Admin_Logs from './admin_Pages/adminLogs';
import AccountManagement from './admin_Pages/accountManagement';
import EditAnnouncements from './admin_Pages/editAnnouncements';
import EditPaymentOptions from './admin_Pages/editPaymentoptions';
import MemberManagement from './admin_Pages/memberManagement';



const LandingPage = () => {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/Login');
  };
  const handleMemberClick = () => {
    navigate('/Homepage');
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
                <button className='memberbutton' onClick={handleMemberClick}>
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/adminLogs" element={<Admin_Logs />} />
        <Route path="/account" element={<AccountManagement />} />
        <Route path="/editEvents" element={<EditEvents />} />
        <Route path="/editAnnouncements" element={<EditAnnouncements />} />
        <Route path="/editPaymentInfo" element={<EditPaymentOptions />} />
        <Route path="/members" element={<MemberManagement />} />
        <Route path="/announcements" element={<Announcement />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/Homepage" element={<Homepage />} />
        <Route path="/PaymentOptions" element={<Payment_options />} />
      </Routes>
    </Router>
  );
}

export default App;
