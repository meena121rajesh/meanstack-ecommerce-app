const express = require('express');
const router  = express.Router();
const Order   = require('../models/order.model');
const Cart    = require('../models/cart.model');

// Place order
router.post('/place', async (req, res) => {
  const { userId, address, paymentMode } = req.body;
  try {
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: 'Cart is empty' });

    const order = new Order({
      user:        userId,
      items:       cart.items,
      totalPrice:  cart.totalPrice,
      address,
      paymentMode,
    });

    await order.save();
    await Cart.findOneAndDelete({ user: userId });
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get user orders
router.get('/user/:userId', async (req, res) => {
  const orders = await Order.find({ user: req.params.userId }).populate('items.product');
  res.json(orders);
});

// Update order status (admin)
router.put('/:id/status', async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.json(order);
});

module.exports = router;