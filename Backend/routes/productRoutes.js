const express = require('express');
const Product = require('../models/product');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const multer = require ('multer');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Set the directory for uploads
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });


router.use(verifyToken);

// Add a new product
router.post('/add', upload.single('image'), async (req, res) => {
  const { name, description, category, price, quantity, nutrition, shelfLife } = req.body;

  try {
    const newProduct = new Product({
      farmerId: req.user.userId,
      image: req.file ? req.file.path : null, // Save the image path
      name,
      description,
      category,
      price,
      quantity,
      nutrition,
      shelfLife,
      
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: savedProduct });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add product', error: err.message });
  }
});

// Get all products for a farmer
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({ farmerId: req.user.userId });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products', error: err.message });
  }
});

// Update a product
router.put('/edit/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findOneAndUpdate(
          { _id: req.params.id, farmerId: req.user.userId }, // Verify farmer owns the product
          req.body,
          { new: true }
        );
        if (!updatedProduct) {
          return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
      } catch (err) {
        res.status(500).json({ message: 'Failed to update product', error: err.message });
      }
});

// Delete a product
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findOneAndDelete({
          _id: req.params.id,
          farmerId: req.user.userId, // Verify farmer owns the product
        });
        if (!deletedProduct) {
          return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
      } catch (err) {
        res.status(500).json({ message: 'Failed to delete product', error: err.message });
      }
});

module.exports = router;

