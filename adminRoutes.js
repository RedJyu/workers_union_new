import express from 'express';
import { auth, requireAdmin } from './auth.js';
import Post from './postSchema.js';

const router = express.Router();

router.get('/', auth, requireAdmin, (req, res) => {
  res.send(`
    <div>
      <form method="POST" action="/admin">
        <input name="title" placeholder="Title" />
        <input name="content" placeholder="Content" />
        <button type="submit">Submit</button>
      </form>
    </div>
  `);
});

router.post('/', auth, requireAdmin, async (req, res) => {
  try {
    // Retrieve data from the form body
    const { title, content } = req.body;

    // Create a new post instance
    const newPost = new Post({ title, content });

    // Save the new post to the database
    await newPost.save();

    res.redirect('/admin/success');
  } catch (error) {
    res.status(500).send('An error occurred while saving the data.');
  }
});

router.get('/success', (req, res) => {
  res.send('Data successfully submitted!');
});

export default router;
