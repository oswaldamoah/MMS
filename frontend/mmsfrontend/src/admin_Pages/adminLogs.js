import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import './adminLogs.css';

function AdminLogs() {
  const navigate = useNavigate();
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleOptionClick = (path) => {
    setDropdownVisible(false);
    navigate(path);
  };

  return (
    <div className="admin-logs-page">
      <AdminHeader headertitle="Admin Logs" />
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
