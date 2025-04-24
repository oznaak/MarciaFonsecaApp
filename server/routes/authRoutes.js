const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authOptional } = require('../middleware/auth');

// Register a new user
router.post('/register', authController.register);

// Login existing user
router.post('/login', authController.login);

// Get current user (optional auth)
router.get('/me', authOptional, authController.getCurrentUser);

module.exports = router; 