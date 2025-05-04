const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();

// Middleware
app.use(cors());
// Stripe webhook endpoint needs raw body
const stripeController = require('./controllers/stripeController');
app.post('/webhook', express.raw({ type: 'application/json' }), stripeController.webhookHandler);
// Parse JSON bodies for all other routes
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-app')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Import auth and course routes
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to MERN application' });
});

// Mount auth and course API routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

// Mount admin API routes (requires authentication and admin)
const { authRequired } = require('./middleware/auth');
const { adminRequired } = require('./middleware/admin');
app.use('/api/admin', authRequired, adminRequired, adminRoutes);

// Serve static files from the React/Vite app build directory
if (process.env.NODE_ENV === 'production') {
  // Serve static files
  app.use(express.static(path.join(__dirname, '../client/dist')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
  });
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 