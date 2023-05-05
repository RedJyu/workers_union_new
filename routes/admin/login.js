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

export const handleSignin = async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid email' });
  }

  // Check if the password is correct
  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  // Generate a JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '5h',
  });

  // Set the token as a cookie
  res.cookie('jwt', token, { httpOnly: true });
  res.send(`Logged in successfully ${user.name}.`);
};
