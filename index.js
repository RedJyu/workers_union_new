import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import connect from './mongoose.js';
import { signin, handleSignin } from './routes/admin/login.js';
import dotenv from 'dotenv/config';

// import auth from './auth.js';

const router = express.Router();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: 'session',
    keys: JSON.parse(process.env.SESSION_KEYS),
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: true,
  })
);

connect();

// Route for the signin page
app.get('/signin', signin);

// Route for handling the signin form submission
app.post('/signin', handleSignin);

app.get('/signout', (req, res) => {
  req.session = null;
  res.clearCookie('jwt');
  res.send('Wylogowano');
});

app.listen(port, () => {
  console.log('working');
});
