const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto'); // Built-in node module for verification
const Order = require('../models/Order');

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 1. POST Route: Order create karne ke liye
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
    console.error("Order Creation Error:", error);
    res.status(500).json({ message: "Server Error during order creation" });
  }
});

// 2. POST Route: Payment Verify karne ke liye (Ise add karna zaroori hai)
router.post('/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Razorpay signature verify karne ka tarika
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isSignatureValid = expectedSignature === razorpay_signature;

    if (isSignatureValid) {
      // Database mein status update karein
      await Order.findOneAndUpdate(
        { razorpay_order_id: razorpay_order_id },
        { 
          status: 'Paid', 
          razorpay_payment_id: razorpay_payment_id 
        }
      );

      res.status(200).json({ success: true, message: "Payment Verified Successfully" });
    } else {
      res.status(400).json({ success: false, message: "Invalid Signature" });
    }
  } catch (error) {
    console.error("Verification Error:", error);
    res.status(500).json({ message: "Internal Server Error during verification" });
  }
});

module.exports = router;