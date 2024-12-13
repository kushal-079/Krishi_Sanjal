const express = require('express');
const Product = require('../models/product');
const router = express.Router();

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products
    console.log('Products fetched:', products); // Debug log
    res.status(200).json(products); // Return as JSON
  } catch (err) {
    console.error('Error fetching products:', err); // Log error
    res.status(500).json({ message: 'Failed to fetch products', error: err.message });
  }
});

module.exports = router;