const rejestracja = () => {
  app.get('/signup', (req, res) => {
    if (req.user) {
      // If user is logged in, display their name
      res.send(`Welcome, ${req.user.name}!`);
    } else {
      // If user is not logged in, display registration form
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
      // Create new user with data submitted in form
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10), // hash and salt the password
        passwordConfirmation: await bcrypt.hash(
          req.body.passwordConfirmation,
          10
        ),
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
          res
            .status(500)
            .send('An error occurred while creating your account.');
        }
      }
    }
  });

  app.get('/success', (req, res) => {
    res.send('Your account has been successfully created!');
  });
};
