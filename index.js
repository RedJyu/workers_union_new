import express from 'express';
import bodyParser from 'body-parser';
import connect from './mongoose.js';
import { signin, login } from './routes/admin/login.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import { home } from './home.js';
import { adminPanel } from './admin.js';
import { auth, requireAdmin } from './auth.js';

dotenv.config();
const router = express.Router();

const app = express();
const port = process.env.PORT || 3000;
connect();
app.use(
  cookieSession({
    name: 'session',
    keys: [process.env.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/home', auth, home);

app.get('/admin', auth, requireAdmin, adminPanel);

// Route for the signin page
app.get('/signin', signin);

// Route for handling the signin form submission
app.post('/signin', login);

app.get('/signout', (req, res) => {
  res.clearCookie('token');
  res.send('Wylogowano');
});

app.listen(port, () => {
  console.log('working');
});
