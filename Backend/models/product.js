const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'user_info', required: true },
  image: { type: String }, // Store image path or URL
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: String, required: true },
  nutrition: { type: String },
  shelfLife: { type: String },
  
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
