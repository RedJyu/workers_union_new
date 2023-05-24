import express from 'express';
import { auth, requireAdmin } from './auth.js';
import { body, validationResult } from 'express-validator';
import Post from './postSchema.js';

const router = express.Router();

router.get('/', auth, requireAdmin, (req, res) => {
  const errors = req.session.errors || [];
  const successMessage = req.session.successMessage;

  req.session.errors = [];
  req.session.successMessage = '';

  res.send(`
    <div>
      <form method="POST" action="/admin">
        <input name="title" placeholder="Title" />
        <input name="content" placeholder="Content" />
        <button type="submit">Submit</button>
        ${
          errors.length > 0
            ? `<p style="color: red;">${errors.join(', ')}</p>`
            : ''
        }
        ${
          successMessage ? `<p style="color: green;">${successMessage}</p>` : ''
        }
      </form>
    </div>
  `);
});

router.post(
  '/',
  auth,
  requireAdmin,
  [
    body('title').notEmpty().withMessage('Title is required.'),
    body('content').notEmpty().withMessage('Content is required.'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.session.errors = errors.array().map((error) => error.msg);
        return res.redirect('/admin');
      }

      const { title, content } = req.body;

      const newPost = new Post({ title, content });

      await newPost.save();

      req.session.successMessage = 'Data successfully submitted!';
      res.redirect('/admin');
    } catch (error) {
      req.session.errors = ['An error occurred while saving the data.'];
      res.redirect('/admin');
    }
  }
);

export default router;
