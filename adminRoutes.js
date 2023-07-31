import express from 'express';
import { auth, requireAdmin } from './auth.js';
import { body, validationResult } from 'express-validator';
import Post from './postSchema.js';
import { layoutAdmin } from './views/admin/layout.js';

const router = express.Router();

router.get('/', auth, requireAdmin, (req, res) => {
  const errors = req.session.errors || [];
  const successMessage = req.session.successMessage;

  req.session.errors = [];
  req.session.successMessage = '';

  res.send(
    layoutAdmin({
      content: `
 <div class="form-container">

 <form method="POST" action="/admin" id="postForm">
 <div class="input-group">
 <label for="title">Tytuł</label>
 <input type="text" name="title" id="title" placeholder="Tytuł" />
 <div id="editor" style="height: 300px;"></div>
 <input type="hidden" name="content" id="quillContent">
    <div class="input-group">
      <label for="imageUrl">Link do zdjęcia</label>
      <input type="text" name="imageUrl" id="imageUrl" placeholder="Link do zdjęcia" />
    </div>
    <button type="submit">Dodaj</button>
    ${
      errors.length > 0
        ? `<p class="error-message">${errors.join(', ')}</p>`
        : ''
    }
    ${successMessage ? `<p class="success-message">${successMessage}</p>` : ''}
  </form>
</div>

  `,
    })
  );
});

router.post(
  '/',

  auth,
  requireAdmin,
  [
    body('title').notEmpty().withMessage('Title is required.'),
    body('content').notEmpty().withMessage('Content is required.'),
    body('imageUrl')
      .optional({ checkFalsy: true })
      .isURL()
      .withMessage('Invalid image URL.'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.session.errors = errors.array().map((error) => error.msg);
        return res.redirect('/admin');
      }

      const { title, content, imageUrl } = req.body;

      const newPost = new Post({ title, content, imageUrl });

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
