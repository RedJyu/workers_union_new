export const home = async (req, res) => {
  // Check if user is logged in
  if (!req.user) {
    return res.status(401).send('Please authenticate.');
  }

  // Display user name
  res.send(`
    <div>
      Welcome, ${req.user.name}!
    </div>
  `);
};
