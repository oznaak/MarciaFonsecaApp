const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT
function generateToken(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1d' });
}

// Register new user
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: 'Email already registered' });
    user = new User({ name, email, password });
    await user.save();
    const token = generateToken(user);
    res.status(201).json({ token, id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
};

// Login existing user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
    const token = generateToken(user);
    res.json({ token, id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
};

// Get current user info
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password').lean();
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ ...user, isAdmin: user.isAdmin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// Mark lesson as complete
exports.markLessonComplete = async (req, res) => {
  try {
    const { lessonId } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Add lessonId to completedLessons if not already present
    if (!user.completedLessons.includes(lessonId)) {
      user.completedLessons.push(lessonId);
      await user.save();
    }

    res.status(200).json({ message: 'Lesson marked as complete', completedLessons: user.completedLessons });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to mark lesson as complete' });
  }
};

// Mark lesson as not complete
exports.markLessonNotComplete = async (req, res) => {
  try {
    const { lessonId } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Remove lessonId from completedLessons if present
    user.completedLessons = user.completedLessons.filter(id => id.toString() !== lessonId);
    await user.save();

    res.status(200).json({ message: 'Lesson marked as not complete', completedLessons: user.completedLessons });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to mark lesson as not complete' });
  }
};