const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get all users (for frontend display)
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, 'username email');
    res.json(users.map(u => ({ name: u.username, email: u.email })));
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a new user (from frontend)
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    // Set a default password for demo purposes
    const password = 'changeme123';
    const user = new User({ username: name, email, password });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
});

module.exports = router;
