const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const memberSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  contact: {
    type: String,
    required: [true, 'Contact is required'],
  },
  dateJoined: {
    type: String,
    required: [true, 'Date joined is required'],
    validate: {
      validator: function (v) {
        return moment(v, 'YYYY-MM-DD', true).isValid();
      },
      message: props => `${props.value} is not a valid date format! Use YYYY-MM-DD (e.g., 2024-06-11).`,
    },
  },
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
