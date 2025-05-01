const Course = require('../models/Course');
const mongoose = require('mongoose');

// List all courses (short info)
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .select('title description rating price discount previousPrice thumbnail studentDescription lessons instructor duration')
      .lean();
    const formatted = courses.map(c => ({
      id: c._id,
      title: c.title,
      description: c.description,
      rating: c.rating,
      price: c.price,
      discount: c.discount,
      previousPrice: c.previousPrice,
      thumbnail: c.thumbnail,
      studentDescription: c.studentDescription,
      lessonsCount: c.lessons?.length || 0, // Include the number of lessons
      instructor: c.instructor,
      duration: c.duration
    }));
    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
};

// Get single course by ID (with lessons)
exports.getCourseById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid course ID' });
  }
  try {
    const course = await Course.findById(id).lean();
    if (!course) return res.status(404).json({ error: 'Course not found' });
    course.id = course._id;
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch course' });
  }
};

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const { title, description, studentDescription, rating, price, discount, previousPrice, lessons, thumbnail, instructor } = req.body;
    const newCourse = new Course({ title, description, studentDescription, rating, price, discount, previousPrice, lessons, thumbnail, instructor });
    const saved = await newCourse.save();
    res.status(201).json({ id: saved._id, ...saved.toObject() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create course' });
  }
};

// Enroll user in a course
exports.enrollCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    const courseId = req.params.id;
    if (!require('mongoose').Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: 'Invalid course ID' });
    }
    const User = require('../models/User');
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ error: 'Already enrolled' });
    }
    user.enrolledCourses.push(courseId);
    await user.save();
    // also add this user to the course's enrolledStudents array
    await Course.findByIdAndUpdate(courseId, { $addToSet: { enrolledStudents: userId } });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Enrollment failed' });
  }
};