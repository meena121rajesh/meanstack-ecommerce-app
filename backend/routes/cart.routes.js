const express = require('express');
const router  = express.Router();
const Cart    = require('../models/cart.model');
const Product = require('../models/product.model');

// Get cart
router.get('/:userId', async (req, res) => {
  const cart = await Cart.findOne({ user: req.params.userId }).populate('items.product');
  res.json(cart || { items: [], totalPrice: 0 });
});

// Add to cart
router.post('/add', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [], totalPrice: 0 });
    }

    const itemIndex = cart.items.findIndex(i => i.product.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, price: product.price });
    }

    cart.totalPrice = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Remove from cart
router.delete('/remove/:userId/:productId', async (req, res) => {
  const cart = await Cart.findOne({ user: req.params.userId });
  cart.items = cart.items.filter(i => i.product.toString() !== req.params.productId);
  cart.totalPrice = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  await cart.save();
  res.json(cart);
});

// Clear cart
router.delete('/clear/:userId', async (req, res) => {
  await Cart.findOneAndDelete({ user: req.params.userId });
  res.json({ message: 'Cart cleared' });
});

module.exports = router;