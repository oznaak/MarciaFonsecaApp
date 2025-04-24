const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

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

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to MERN application' });
});

// Mount auth and course API routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 