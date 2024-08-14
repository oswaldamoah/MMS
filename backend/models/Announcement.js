// models/Announcement.js

const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  announcementTitle: 
  { 
    type: String, 
    required: true 
  },
  announcementDetails: { 
    type: String, 
    required: true },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }, // Automatically set to current date and time
});

module.exports = mongoose.model('Announcement', announcementSchema);
