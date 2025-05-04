const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authRequired } = require('../middleware/auth');
const { adminRequired } = require('../middleware/admin');

// Courses CRUD
router.get('/courses', authRequired, adminRequired, adminController.getAllCourses);
router.post('/courses', authRequired, adminRequired, adminController.createCourse);
router.put('/courses/:id', authRequired, adminRequired, adminController.updateCourse);
router.delete('/courses/:id', authRequired, adminRequired, adminController.deleteCourse);

// Users management
router.get('/users', authRequired, adminRequired, adminController.getAllUsers);
router.delete('/users/:id', authRequired, adminRequired, adminController.deleteUser);
router.post('/users/:id/admin', authRequired, adminRequired, adminController.setUserAdmin);

// Stats
router.get('/stats', authRequired, adminRequired, adminController.getStats);

module.exports = router;