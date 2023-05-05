import jwt from 'jsonwebtoken';
import User from './signup.js';

const auth = async (req, res, next) => {
  try {
    // Get token from cookie
    const token = req.session.token;

    // Verify token and decode user ID
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

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

export default auth;
