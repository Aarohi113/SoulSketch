const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection (Ise bahar rakhna behtar hai taaki function reuse ho sake)
mongoose.connect(process.env.MONGO_URI || "mongodb+srv://testuser:TestPass123@cluster0.xbdmysa.mongodb.net/SoulSketch?retryWrites=true&w=majority")
.then(() => console.log("MongoDB Connected..."))
.catch(err => console.log(err));

const paymentRoutes = require('./routes/payment');
app.use('/api/order', paymentRoutes);

// Test Route (Check karne ke liye ki backend chal raha hai)
app.get("/", (req, res) => res.send("Server is running on Vercel"));




// Local testing ke liye
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
module.exports = app; 