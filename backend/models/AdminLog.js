const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminLogSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  activity: {
    type: String,
    required: true,
    enum: ['created account', 'logged in', 'logged out'] // Restrict to specific activities
  },
  dateTime: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const AdminLog = mongoose.model('AdminLog', adminLogSchema);

module.exports = AdminLog;
