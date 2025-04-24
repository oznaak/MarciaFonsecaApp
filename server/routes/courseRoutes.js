const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { getCourses, getCourseById, createCourse, enrollCourse } = require('../controllers/courseController');
const stripeController = require('../controllers/stripeController');

// List all courses
router.get('/', courseController.getCourses);

// Get a single course by ID
router.get('/:id', courseController.getCourseById);

// Create a new course
router.post('/', courseController.createCourse);

// Create Stripe checkout session for course purchase (requires auth)
router.post('/:id/checkout-session', require('../middleware/auth').authRequired, stripeController.createCheckoutSession);

// Enroll in course after webhook or manual call (requires auth)
router.post('/:id/enroll', require('../middleware/auth').authRequired, enrollCourse);

module.exports = router; 