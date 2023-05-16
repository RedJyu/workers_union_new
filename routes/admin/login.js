import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../signup.js';

export const signin = async (req, res) => {
  res.send(`
    <div>
      <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="hasło" />
        <button> Logowanie </button>
      </form>
    </div>
  `);
};

export const login = async (req, res) => {
  try {
    // Get user from database based on email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Compare password with the hash stored in the database
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
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

    // Send success response with token
    res.json({ message: `Logged in successfully ${user.name}.`, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};
