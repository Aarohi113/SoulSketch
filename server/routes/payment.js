const express = require('express');
const router = express.Router(); // Ye line zaroori hai
const Razorpay = require('razorpay');
const Order = require('../models/Order');

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// POST Route: Order create karne ke liye
router.post('/create', async (req, res) => {
  try {
    const options = {
      amount: req.body.totalAmount * 100, 
      currency: "INR",
    };
    const razorpayOrder = await instance.orders.create(options);

    const newOrder = new Order({
      customerName: req.body.customerName,
      email: req.body.email,
      phone: req.body.phone,
      dob: req.body.dob,
      pob: req.body.pob,
      gender: req.body.gender,
      totalAmount: req.body.totalAmount,
      razorpay_order_id: razorpayOrder.id,
      status: 'Pending'
    });
    
    await newOrder.save();
    res.json({ success: true, orderId: razorpayOrder.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router; // Ise export karna mat bhuliyega