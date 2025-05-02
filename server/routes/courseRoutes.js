const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { getCourses, getCourseById, createCourse, enrollCourse, addRating, getRatings } = require('../controllers/courseController');
const stripeController = require('../controllers/stripeController');
const { authRequired } = require('../middleware/auth');

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

// Add a rating to a course
router.post('/:id/ratings', authRequired, addRating);

// Get ratings for a course
router.get('/:id/ratings', getRatings);

// Delete a rating from a course
router.delete('/:id/ratings/:ratingId', authRequired, courseController.deleteRating);

module.exports = router;