const Course = require('../models/Course');
const User = require('../models/User');

// Courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('enrolledStudents', 'name email')
      .lean();
    res.json(courses);
  } catch (err) {
    console.error('Error fetching courses for admin:', err);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const { title, description, studentDescription, price, discount, previousPrice, lessons, thumbnail, instructor } = req.body;
    const course = new Course({ title, studentDescription, description, price, discount, previousPrice, lessons, thumbnail, instructor });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    console.error('Error creating course:', err);
    res.status(500).json({ error: 'Failed to create course' });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const updatedData = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(courseId, updatedData, { new: true });
    if (!updatedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json(updatedCourse);
  } catch (err) {
    console.error('Error updating course:', err);
    res.status(500).json({ error: 'Failed to update course' });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting course:', err);
    res.status(500).json({ error: 'Failed to delete course' });
  }
};

// Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').lean();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

exports.setUserAdmin = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isAdmin: true }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Error setting user as admin:', err);
    res.status(500).json({ error: 'Failed to update user role' });
  }
};

// Stats
exports.getStats = async (req, res) => {
  try {
    // Calculate total revenue and enrollment counts
    const stats = await Course.aggregate([
      {
        $project: {
          revenue: { $multiply: ['$price', { $size: '$enrolledStudents' }] },
          enrollments: { $size: '$enrolledStudents' }
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$revenue' },
          totalEnrollments: { $sum: '$enrollments' },
          courseCount: { $sum: 1 }
        }
      }
    ]);
    const result = stats[0] || { totalRevenue: 0, totalEnrollments: 0, courseCount: 0 };
    res.json({ totalRevenue: result.totalRevenue, totalEnrollments: result.totalEnrollments, courseCount: result.courseCount });
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};