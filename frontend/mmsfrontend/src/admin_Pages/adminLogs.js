import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import './adminLogs.css';
import './DropdownMenu'; // Ensure the CSS for the dropdown menu is included

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
              <td>Logged In</td>
              <td>15-Aug-2024 20:00</td>
            </tr>
            <tr>
              <td>james12</td>
              <td>Logged In</td>
              <td>15-Aug-2024 22:17</td>
            </tr>
            <tr>
              <td>james12</td>
              <td>Logged Out</td>
              <td>16-Aug-2024 00:47</td>
            </tr>
            <tr>
              <td>lesall</td>
              <td>Logged In</td>
              <td>16-Aug-2024 23:57</td>
            </tr>
            <tr>
              <td>lesall</td>
              <td>Logged Out</td>
              <td>17-Aug-2024 00:09</td>
            </tr>
            <tr>
              <td>oswald233</td>
              <td>Logged In</td>
              <td>18-Aug-2024 18:35</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminLogs;