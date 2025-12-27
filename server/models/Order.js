// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: String,
  email: String,
  phone: String,
  dob: String,
  pob: String,
  gender: String,
  totalAmount: Number,
  razorpay_order_id: String,
  razorpay_payment_id: String,
  status: { type: String, default: 'Pending' }, // Pending, Success, Failed
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);