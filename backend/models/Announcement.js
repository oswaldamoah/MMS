const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnnouncementSchema = new Schema({
  announcementTitle: {
    type: String,
    required: true
  },
  announcementDetails: {
    type: String,
    required: true
  },
  announcementImage: {
    type: String,
    default: null
  }
});

const Announcement = mongoose.model('Announcement', AnnouncementSchema);

module.exports = Announcement;
