body, html {
  margin: 0;
  padding: 0;
  overflow: hidden; /* Prevents scrolling */
  font-family: Arial, sans-serif; /* Match the font style */
}

.admin-logs-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  height: 100vh;
  width: 100vw;
  padding-top: 100px; /* Adjust for the fixed header */
}

.admin-logs-table-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100% - 100px); /* Adjust height to fit the table within the page */
  padding: 20px;
}

table {
  width: 80%; /* Adjust this value to control the table width */
  border-collapse: collapse; /* Collapse borders */
  border: 2px solid #4CAF50; /* Outer border */
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

th, td {
  border: 1px solid #4CAF50; /* Inner cell borders */
  padding: 15px; /* Adjust padding */
  text-align: center; /* Center text alignment */
}

th {
  background-color: #4CAF50; /* Match header background */
  color: #fff; /* Header text color */
  font-weight: bold;
  text-transform: uppercase; /* Uppercase header text */
}

td {
  background-color: #ffffff; /* Cell background */
  color: #333; /* Cell text color */
}

tr:hover td {
  background-color: #f0fff0; /* Hover effect for cells */
  color: #333; /* Text color on hover */
}

tr:nth-child(even) td {
  background-color: #f7f9f7; /* Even rows background */
}

tr:nth-child(odd) td {
  background-color: #ffffff; /* Odd rows background */
}
