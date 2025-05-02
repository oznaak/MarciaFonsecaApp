const Course = require('../models/Course');
const mongoose = require('mongoose');

// List all courses (short info)
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .select('title description rating price discount previousPrice thumbnail studentDescription lessons instructor duration ratings')
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
      duration: c.duration,
      ratings: c.ratings || []
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
    const course = await Course.findById(id).populate('ratings.user', 'name').lean();
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

// Add a rating to a course
exports.addRating = async (req, res) => {
  try {
    const { id } = req.params; // Course ID
    const { value, comment } = req.body;
    const userId = req.user.id;

    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    // Check if the user already rated
    const existingRating = course.ratings.find(r => r.user.toString() === userId);
    if (existingRating) {
      return res.status(400).json({ error: 'You have already rated this course' });
    }

    // Add the new rating
    course.ratings.push({ user: userId, value, comment });
    await course.save();

    res.status(201).json({ message: 'Rating added successfully', ratings: course.ratings });
  } catch (err) {
    console.error('Error adding rating:', err);
    res.status(500).json({ error: 'Failed to add rating' });
  }
};

// Fetch ratings for a course
exports.getRatings = async (req, res) => {
  try {
    const { id } = req.params; // Course ID
    const course = await Course.findById(id).populate('ratings.user', 'name');
    if (!course) return res.status(404).json({ error: 'Course not found' });

    res.json(course.ratings);
  } catch (err) {
    console.error('Error fetching ratings:', err);
    res.status(500).json({ error: 'Failed to fetch ratings' });
  }
};

// Delete a rating from a course
exports.deleteRating = async (req, res) => {
  try {
    const { id, ratingId } = req.params; // Course ID and Rating ID
    const userId = req.user.id; // Authenticated user ID

    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    // Find the rating to delete
    const ratingIndex = course.ratings.findIndex(
      (r) => r._id.toString() === ratingId && r.user.toString() === userId
    );

    if (ratingIndex === -1) {
      return res.status(404).json({ error: 'Rating not found or not authorized' });
    }

    // Remove the rating
    course.ratings.splice(ratingIndex, 1);
    await course.save();

    res.json({ message: 'Rating removed successfully', ratings: course.ratings });
  } catch (err) {
    console.error('Error deleting rating:', err);
    res.status(500).json({ error: 'Failed to delete rating' });
  }
};