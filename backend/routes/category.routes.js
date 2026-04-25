const express = require('express');
const router  = express.Router();
const Category = require('../models/category.model');

router.get('/', async (req, res) => {
  const cats = await Category.find();
  res.json(cats);
});

router.post('/', async (req, res) => {
  try {
    const cat = new Category(req.body);
    await cat.save();
    res.status(201).json(cat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: 'Category deleted' });
});

module.exports = router;