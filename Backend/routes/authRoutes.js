const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const router = express.Router();
const dotenv = require('dotenv');

// Get the secret from environment variables
dotenv.config();


// Farmer registration codes
const FARMER_CODES = ['FARM123', 'KRISHI456'];

// Sign Up Route
router.post('/signup', async (req, res) => {
  const { fullName, username, email, phoneNumber, password, role, registrationCode, shopName, address } = req.body;

  try {
    // Check if user already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // If signup as farmer, check the registration code
    if (role === 'farmer' && !registrationCode) {
      return res.status(400).json({ message: 'Registration code is required for farmers' });
    }
    // Check farmer registration code if the role is 'farmer'
    if (role === 'farmer' && !FARMER_CODES.includes(registrationCode)) {
      return res.status(400).json({ message: 'Invalid registration code' });
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new user({
      fullName,
      username,
      email,
      phoneNumber,
      password,
      role,
      registrationCode: role === 'farmer' ? registrationCode : null,
      shopName: role === 'farmer' ? shopName : null,
      address: role === 'farmer' ? address : null,
    });

    // Save user to DB
    const savedUser = await newUser.save();

    const { password: _, ...userWithoutPassword } = savedUser.toObject();
    res.status(201).json({ message: 'User created successfully', user: userWithoutPassword }); 
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
    console.log('Data is not saved in the database', err.message);
  }
});


// Login Route
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await user.findOne({ email });
    if (!userFound) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    // Check password
    console.log(password);
    console.log(userFound.password);
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: userFound._id, role: userFound.role }, process.env.JWT_SECRET, { expiresIn: '1h' });



    res.status(200).json({ token, user: userFound });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Middleware to protect routes (only for farmers)
const protectFarmerRoute = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
    
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'farmer') {
      return res.status(403).json({ message: 'Access denied, farmers only' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
    
  }
};


const protectConsumerRoute = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'consumer') {
      return res.status(403).json({ message: 'Access denied, consumer only' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

// Verify token route
router.post('/verify-token', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const foundUser = await user.findById(decoded.userId);
    if (!foundUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    const { password, ...userData } = foundUser.toObject(); // Exclude password
    res.status(200).json({ user: userData });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
});


router.get('/farmer', protectFarmerRoute, (req, res) => {
  res.status(200).json({ message: 'Welcome to the farmer page' });
});

router.get('/consumer', protectConsumerRoute, (req, res) => {
  res.status(200).json({ message: 'Welcome to the Consumer page' });
});

module.exports = router;
