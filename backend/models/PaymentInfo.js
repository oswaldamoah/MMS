const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentInfoSchema = new Schema({
  paymentDetails: {
    type: String,
    required: true
  }
});

const PaymentInfo = mongoose.model('PaymentInfo', PaymentInfoSchema);

module.exports = PaymentInfo;



/* 
Model for
*/