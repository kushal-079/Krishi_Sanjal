const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'user_info', required: true },
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: String, required: true },
  nutrition: { type: String },
  shelfLife: { type: String },
  image: { type: String }, // Store image path or URL
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
