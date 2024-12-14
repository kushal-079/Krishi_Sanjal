const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');







// Initialize the app
const app = express();




// Enable dotenv for environment variables
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Routes

app.use('/', authRoutes);
app.use('/farmer/my-products', productRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));




// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));













