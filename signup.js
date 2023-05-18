import bcrypt from 'bcrypt';
import express from 'express';
import User from './userSchema.js';
import mongoose from 'mongoose';

export const signup = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.get('/signup', (req, res) => {
    if (req.user) {
      // If the user is logged in, display their name
      res.send(`Welcome, ${req.user.name}!`);
    } else {
      // If the user is not logged in, display the registration form
      res.send(`
      <div>
        <form method="POST">
          <input name="name" placeholder="name" />
          <input name="email" placeholder="email" />
          <input name="password" placeholder="password" type="password" />
          <input name="passwordConfirmation" placeholder="confirm password" type="password" />
          <button>Register</button>
        </form>
      </div>
    `);
    }
  });

  // Handle form submission
  app.post('/signup', async (req, res) => {
    try {
      const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        passwordConfirmation: await bcrypt.hash(
          req.body.passwordConfirmation,
          10
        ),
      };

      // Save the new user to the users collection in the usersDB database
      await User.create(newUser);

      // Redirect to the success page
      res.redirect('/success');
    } catch (err) {
      if (err.code === 11000 && err.keyPattern.email) {
        return res
          .status(400)
          .send('An account with that email already exists.');
      }

      if (err instanceof mongoose.Error.ValidationError) {
        let validationErrors = [];
        for (let field in err.errors) {
          validationErrors.push(err.errors[field].message);
        }
        return res.status(400).send(validationErrors);
      }

      console.error(err);
      return res
        .status(500)
        .send('An error occurred while creating your account.');
    }
  });

  app.get('/success', (req, res) => {
    res.send('Your account has been successfully created!');
  });
};
