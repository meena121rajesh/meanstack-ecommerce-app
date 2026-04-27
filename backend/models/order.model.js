const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number },
    price:    { type: Number },
  }],
  totalPrice:  { type: Number },
  status:      { type: String, default: 'pending', enum: ['pending','processing','shipped','delivered'] },
  address:     { type: String },
  paymentMode: { type: String, default: 'COD' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);