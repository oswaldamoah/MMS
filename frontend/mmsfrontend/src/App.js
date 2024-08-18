import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import LoginPage from './LoginPage';
import Admin_Logs from './admin_Pages/adminLogs';
import AccountManagement from './admin_Pages/accountManagement';
import EditAnnouncements from './admin_Pages/editAnnouncements';
import EditPaymentOptions from './admin_Pages/editPaymentOptions';
import EditEvents from './admin_Pages/editEvents';
import Events from './member_Pages/Events';
import Homepage from './member_Pages/Homepage';
import Payment_options from './member_Pages/Payment_options';
import Announcement from './member_Pages/announcement';
import MemberManagement from './admin_Pages/memberManagement';
import { AuthProvider} from './AuthContext';
import PrivateRoute from './PrivateRoute';

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
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(true);
  const [loadingPaymentOptions, setLoadingPaymentOptions] = useState(true);
  const [errorEvents, setErrorEvents] = useState(null);
  const [errorAnnouncements, setErrorAnnouncements] = useState(null);
  const [errorPaymentOptions, setErrorPaymentOptions] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoadingEvents(true);
      setErrorEvents(null);
      try {
        const response = await fetch('http://localhost:5000/api/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        const sortedEvents = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setEvents(sortedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
        setErrorEvents('Unable to load events. Please try again later.');
      } finally {
        setLoadingEvents(false);
      }
    };

    const fetchAnnouncements = async () => {
      setLoadingAnnouncements(true);
      setErrorAnnouncements(null);
      try {
        const response = await fetch('https://mms-0tpv.onrender.com/api/announcements');
        if (!response.ok) {
          throw new Error('Failed to fetch announcements');
        }
        const data = await response.json();
        setAnnouncements(data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
        setErrorAnnouncements('Unable to load announcements. Please try again later.');
      } finally {
        setLoadingAnnouncements(false);
      }
    };

    const fetchPaymentOptions = async () => {
      setLoadingPaymentOptions(true);
      setErrorPaymentOptions(null);
      try {
        const response = await fetch('http://localhost:5000/api/payment-info');
        if (!response.ok) {
          throw new Error('Failed to fetch payment options');
        }
        const data = await response.json();
        setPaymentOptions(data);
      } catch (error) {
        console.error('Error fetching payment options:', error);
        setErrorPaymentOptions('Unable to load payment options. Please try again later.');
      } finally {
        setLoadingPaymentOptions(false);
      }
    };

    fetchEvents();
    fetchAnnouncements();
    fetchPaymentOptions();
  }, []);

  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/Homepage" element={<Homepage />} />

        <Route 
          path="/announcements" 
          element={<Announcement announcements={announcements} loading={loadingAnnouncements} error={errorAnnouncements} />} 
        />
        <Route 
          path="/Events" 
          element={<Events events={events} loading={loadingEvents} error={errorEvents} />} 
        />
        <Route 
          path="/PaymentOptions" 
          element={<Payment_options paymentOptions={paymentOptions} loading={loadingPaymentOptions} error={errorPaymentOptions} />} 
        />

        {/* Protect admin routes */}
        <Route 
          path="/adminLogs" 
          element={<PrivateRoute><Admin_Logs /></PrivateRoute>} 
        />
        <Route 
          path="/account" 
          element={<PrivateRoute><AccountManagement /></PrivateRoute>} 
        />
        <Route 
          path="/editEvents" 
          element={<PrivateRoute><EditEvents /></PrivateRoute>} 
        />
        <Route 
          path="/editAnnouncements" 
          element={<PrivateRoute><EditAnnouncements /></PrivateRoute>} 
        />
        <Route 
          path="/editPaymentOptions" 
          element={<PrivateRoute><EditPaymentOptions /></PrivateRoute>} 
        />
        <Route 
          path="/memberManagement" 
          element={<PrivateRoute><MemberManagement /></PrivateRoute>} 
        />
      </Routes>
    </Router>
  </AuthProvider>
);
}

export default App;
