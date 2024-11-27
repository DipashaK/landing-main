const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDb = require('./Middleware/db');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('dotenv').config(); 
const User = require('./Models/userModel');
const donationRoutes = require('./Routes/donorRoute');
const receiverRoutes = require('./Routes/receiverRoute');
const transplantRoutes = require('./Routes/transplantRoute');

const app = express();


app.use(cors()); 

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
app.use('/api/donor', donationRoutes);
app.use('/api/receivers', receiverRoutes);
app.use('/api/transplant', transplantRoutes);

connectDb();

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, emailId, password } = req.body;
    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      phoneNumber,
      emailId,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful" });
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});