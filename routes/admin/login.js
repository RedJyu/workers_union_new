import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import User from '../../userSchema.js';
import { loginForm } from '../../views/admin/login.js';

const router = express.Router();

router.get('/signin', (req, res) => {
  const errors = [];
  res.send(loginForm({ errors }));
});

router.post(
  '/signin',
  [
    body('email').isEmail().withMessage('Email is invalid.'),
    body('password').notEmpty().withMessage('Password is required.'),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.send(loginForm({ errors: errorMessages }));
    }

    try {
      // Get user from database based on email
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }

      // Compare password with the hash stored in the database
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password.' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '5h',
      });

      // Set token as a cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
      });

      // Redirect the user to /admin
      res.redirect('/admin');
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error.' });
    }
  }
);

export default router;
