const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const newUser = new User({ firstName, lastName, email, password });

    await newUser.save();

    res.status(200).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
