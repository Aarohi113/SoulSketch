const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connect karein
mongoose.connect("mongodb+srv://testuser:TestPass123@cluster0.xbdmysa.mongodb.net/SoulSketch?retryWrites=true&w=majority")
.then(() => console.log("MongoDB Connected..."))
.catch(err => console.log(err));

// Routes import karein
const paymentRoutes = require('./routes/payment');
app.use('/api/order', paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

