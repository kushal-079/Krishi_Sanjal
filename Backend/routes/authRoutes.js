const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const router = express.Router();
const dotenv = require('dotenv');
const verifyToken = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

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


router.get('/profile', verifyToken, async (req, res) => {
  try {
    const userProfile = await user.findById(req.user.userId).select('-password');
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

// Configure Multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Update Profile Endpoint
router.put('/update-profile/farmer', verifyToken, upload.single('profileImage'), async (req, res) => {
  const { fullName, phoneNumber, username, address, shopName, bio } = req.body;

  try {
    const updateData = {
      fullName,
      phoneNumber,
      username,
      address,
      shopName,
      bio,
    };

    if (req.file) {
      updateData.profileImage = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await user.findByIdAndUpdate(req.user.userId, updateData, { new: true });

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
});


router.put('/update-profile/consumer', verifyToken, upload.single('profileImage'), async (req, res) => {
  const { fullName, phoneNumber, username, address, bio } = req.body;
  console.log(req.body);

  try {
    if (fullName?.trim()) updateData.fullName = fullName;
    if (phoneNumber?.trim()) updateData.phoneNumber = phoneNumber;
    if (username?.trim()) updateData.username = username;
    if (address?.trim()) updateData.address = address;
    if (shopName?.trim()) updateData.shopName = shopName;
    if (bio?.trim()) updateData.bio = bio;

    if (req.file) {
      updateData.profileImage = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await user.findByIdAndUpdate(req.user.userId, updateData, { new: true });
    console.log("Succesful");
    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
});


// Change Password Route
router.put('/change-password', verifyToken, async (req, res) => {
  const userId = req.user.userId; // Extract userId from the verified token
  const { oldPassword, newPassword } = req.body;

  try {
    const userFound = await user.findById(userId);
    if (!userFound) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(oldPassword, userFound.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect old password' });
    }

    userFound.password = newPassword;
    await userFound.save();

    const newToken = jwt.sign(
      { userId: userFound._id, role: userFound.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});



module.exports = router;
