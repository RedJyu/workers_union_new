import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import User from './signup.js';
import cookieSession from 'cookie-session';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ['h3k5ghj45g34kjgw9i'],
  })
);

mongoose
  .connect('mongodb://mo35226_Users:GrimTest12@mongo.ct8.pl/mo35226_Users', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    keepAlive: true, // Keep sockets alive even when there's no activity
    keepAliveInitialDelay: 300000, // Wait 5m before sending keepalive packets
    retryWrites: true, // Retry writes if they fail due to network errors
    w: 'majority', // Ensure that writes are acknowledged across the replica set
  })
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.error(err);
  });

//

//   /////////////////////////////

app.get('/', (req, res) => {
  res.send(`
  <div>
  Your ID is: ${req.session.userId}
  <form method="POST">
  <input name="name" placeholder="name" />
  <input name="email" placeholder="email" />
        <input name="password" placeholder="hasło" />
        <input name="passwordConfirmation" placeholder="potwierdź hasło" />
        <button> Rejestracja </button>
    </form>
  </div>
  `);
});

// Handle form submission
app.post('/', async (req, res) => {
  try {
    // Create new user with data submitted in form
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation,
    });

    // Save user to database
    await user.save();
    req.session.userId = user.userId;

    // Redirect to success page
    res.redirect('/success');
  } catch (err) {
    // Check if the error is a duplicate key error
    if (err.code === 11000 && err.keyPattern.email) {
      // Send a customized error message to the user
      res.status(400).send('An account with that email already exists.');
    } else {
      // Check for validation errors
      let validationErrors = '';
      if (err.errors.name) {
        validationErrors += 'Name is required. ';
      }
      if (err.errors.password) {
        validationErrors += 'Password is required. ';
      }
      if (err.errors.passwordConfirmation) {
        validationErrors += 'Password confirmation is required. ';
      }

      if (validationErrors) {
        // Send a validation error message to the user
        res.status(400).send(validationErrors);
      } else {
        // Send a generic error message to the user
        console.error(err);
        res.status(500).send('An error occurred while creating your account.');
      }
    }
  }
});

app.get('/success', (req, res) => {
  res.send('Your account has been successfully created!');
});

app.listen(port, () => {
  console.log('working');
});
