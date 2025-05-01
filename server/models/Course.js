const mongoose = require('mongoose');

// Lesson schema embedded in Course
const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  studentDescription: { type: String },
  videoUrl: { type: String },
  order: { type: Number, default: 0 }
});

// Course schema
const CourseSchema = new mongoose.Schema({
  instructor: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  studentDescription: { type: String },
  rating: { type: Number, default: 0 },
  price: { type: Number, required: true },
  thumbnail: { type: String },
  discount: { type: Number, default: 0 },
  lessons: [LessonSchema],
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', CourseSchema); 