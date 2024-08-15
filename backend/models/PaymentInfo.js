const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentInfoSchema = new Schema({
  paymentOption: {
    type: String,
    required: true,
  },
  paymentDetails: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PaymentInfo = mongoose.model('PaymentInfo', PaymentInfoSchema);
module.exports = PaymentInfo;
