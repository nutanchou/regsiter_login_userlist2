// backend/routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Registration route
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Create a new user
    const newUser = new User({ firstName, lastName, email, password });

    // Save the user to the database
    await newUser.save();

    res.status(200).json({ message: 'User registered successfully' });  // Ensure a JSON response
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Server Error' });  // Return a JSON error message
  }
});

module.exports = router;
