const express = require('express');
const router  = express.Router();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ user: { _id: user._id, name: user.name, email: user.email, role: user.role }, token });
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message });
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await user.matchPassword(req.body.password)))
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ user: { _id: user._id, name: user.name, email: user.email, role: user.role }, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;