const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  dateJoined: {
    type: String,
    required: true,
    validate: { // Ensures that date is in the right format
        validator: function(v) {
          return moment(v, 'DD-MMM-YYYY', true).isValid();
        },
        message: props => `${props.value} is not a valid date format! Please use DA-MON-YEAR (e.g., 11-JUN-2024)`
      }
  }
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
