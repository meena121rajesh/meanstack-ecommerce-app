const express = require('express');
const router  = express.Router();
const Review  = require('../models/review.model');
const Product = require('../models/product.model');

// Get reviews for product
router.get('/:productId', async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId }).populate('user', 'name');
  res.json(reviews);
});

// Add review
router.post('/add', async (req, res) => {
  const { productId, userId, rating, comment } = req.body;
  try {
    const existing = await Review.findOne({ product: productId, user: userId });
    if (existing) return res.status(400).json({ message: 'Already reviewed' });

    const review = new Review({ product: productId, user: userId, rating, comment });
    await review.save();

    // Update product rating
    const reviews = await Review.find({ product: productId });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await Product.findByIdAndUpdate(productId, { ratings: avgRating, numReviews: reviews.length });

    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;