//routes/members.js
const express = require('express');
const router = express.Router();
const Member = require('../models/Member'); // Adjust the path as needed

// Route to fetch all member contacts
router.get('/contacts', async (req, res) => {
  try {
    const members = await Member.find({}, 'contact'); // Fetch only the 'contact' field
    const contacts = members.map(member => member.contact).filter(contact => contact); // Ensure contacts are non-empty
    res.json({ contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
