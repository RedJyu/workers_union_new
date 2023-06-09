import express from 'express';
import bodyParser from 'body-parser';
import connect from './mongoose.js';
// import { signin, login } from './routes/admin/login.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import { home, viewPost } from './home.js';
import { signup } from './signup.js';
import adminRoutes from './adminRoutes.js';
import loginRouter from './routes/admin/login.js';

const app = express();
app.use(express.static('public'));
dotenv.config();
connect();

const port = process.env.PORT || 3000;

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

app.get('/home', home);
app.get('/post/:id', viewPost);

app.use('/admin', loginRouter, adminRoutes);

signup(app);
app.get('/signup', signup);
app.post('/signup', signup);

app.get('/signout', (req, res) => {
  res.clearCookie('token');
  res.send('Wylogowano');
});

app.listen(port, () => {
  console.log('working');
});

export default app;
