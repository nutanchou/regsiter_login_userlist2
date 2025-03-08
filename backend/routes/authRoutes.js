// backend/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model

// Registration Route
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password, // Ensure you hash the password in a real-world app!
    });

    await newUser.save();

    // Send success response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ message: 'Failed to register' });
  }
});

module.exports = router;
