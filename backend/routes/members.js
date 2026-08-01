const express = require('express');
const router = express.Router();
const prisma = require('../prismaClient');

// Route to fetch all member contacts
router.get('/contacts', async (req, res) => {
  try {
    const members = await prisma.member.findMany({ select: { contact: true } });
    const contacts = members.map(member => member.contact).filter(contact => contact);
    res.json({ contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

