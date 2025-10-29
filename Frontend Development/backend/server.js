const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory database
let users = [
  {
    user_id: 1,
    name: "John Doe",
    email_id: "john@example.com",
    ph_no: "+1 (555) 123-4567"
  },
  {
    user_id: 2,
    name: "Jane Smith",
    email_id: "jane@example.com",
    ph_no: "+1 (555) 987-6543"
  },
  {
    user_id: 3,
    name: "Bob Johnson",
    email_id: "bob@example.com",
    ph_no: "+1 (555) 456-7890"
  }
];

let nextId = 4;

// Routes

// Get all users
app.get('/allusers', (req, res) => {
  try {
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user by ID
app.get('/user/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.user_id === id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create new user
app.post('/addUser', (req, res) => {
  try {
    const { name, email_id, ph_no } = req.body;
    
    // Validation
    if (!name || !email_id || !ph_no) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Check if email already exists
    const existingUser = users.find(u => u.email_id === email_id);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    
    const newUser = {
      user_id: nextId++,
      name: name.trim(),
      email_id: email_id.trim(),
      ph_no: ph_no.trim()
    };
    
    users.push(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update user
app.put('/user/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, email_id, ph_no } = req.body;
    
    // Validation
    if (!name || !email_id || !ph_no) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    const userIndex = users.findIndex(u => u.user_id === id);
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if email already exists (excluding current user)
    const existingUser = users.find(u => u.email_id === email_id && u.user_id !== id);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    
    users[userIndex] = {
      user_id: id,
      name: name.trim(),
      email_id: email_id.trim(),
      ph_no: ph_no.trim()
    };
    
    res.json(users[userIndex]);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete user
app.delete('/user/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.user_id === id);
    
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    users.splice(userIndex, 1);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'User Management API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 User Management API server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`👥 Users endpoint: http://localhost:${PORT}/allusers`);
});
