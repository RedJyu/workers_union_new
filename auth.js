import jwt from 'jsonwebtoken';
import User from './userSchema.js';

export const auth = async (req, res, next) => {
  try {
    // Get token from cookie
    const token = req.cookies.token;

    if (!token) {
      throw new Error();
    }

    // Verify token and decode user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId } = decoded;

    // Find user in database based on ID
    const user = await User.findById(userId);
    if (!user) {
      throw new Error();
    }

    // Attach user object to request object
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send('Please authenticate.');
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send('Unauthorized access.');
  }
};
