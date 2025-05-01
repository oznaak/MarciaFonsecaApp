const User = require('../models/User');

// Admin authorization: only allow if user.isAdmin is true
exports.adminRequired = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('isAdmin');
    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: 'Admin access required' });
    }
    next();
  } catch (err) {
    console.error('Admin middleware error', err);
    res.status(500).json({ error: 'Server error' });
  }
}; 