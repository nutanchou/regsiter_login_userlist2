require('dotenv').config(); // Ensure to load environment variables
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Express app setup
const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
// mongoose.connect('mongodb://localhost:27017/userTask', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })

// mongoose.connect('mongodb+srv://<nutanchoudhary162502>:<4qLdgOJANqWCboYQ>@cluster0.mongodb.net/userTask?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Employee schema for MongoDB
const employeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
});

const Employee = mongoose.model('Employee', employeeSchema);

// Registration API
app.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const newEmployee = new Employee({ firstName, lastName, email, password });
    await newEmployee.save();
    res.status(201).json({ message: 'Registration Successful' });
  } catch (error) {
    res.status(400).json({ error: 'Email already registered or validation error' });
  }
});

// Login API
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const employee = await Employee.findOne({ email, password });
    if (employee) {
      res.status(200).json({ message: 'Login Successful', employee });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// **New route to fetch all users**
app.get('/users', async (req, res) => {
  try {
    const users = await Employee.find(); // Fetch all users from DB
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const user = await Employee.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// server.js or app.js (backend)
app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // This ensures we get the updated user back
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: updatedUser }); // Send updated user back to the frontend
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Server port
app.listen(5000, () => console.log('Server running on port 5000'));
