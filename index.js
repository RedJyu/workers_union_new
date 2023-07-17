import express from 'express';
import bodyParser from 'body-parser';
import connect from './mongoose.js';
import router from './routes/admin/login.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import { home, viewPost } from './home.js';
import { signup } from './signup.js';
import adminRoutes from './adminRoutes.js';
import loginRouter from './routes/admin/login.js';
import cors from 'cors';
import Post from './postSchema.js';

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
app.use(cors());

app.get('/home', home);
app.get('/post/:id', viewPost);

app.get('/api/posts/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;

    const post = await Post.findOne({ postId });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// app.get('/api/posts', async (req, res) => {
//   try {
//     const { skip, limit } = req.query;

//     const posts = await Post.find()
//       .sort({ CreatedAt: -1 })
//       .skip(parseInt(skip))
//       .limit(parseInt(limit));

//     const totalPosts = await Post.countDocuments();

//     res.json({ posts, totalPosts });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.get('/api/posts/:id', async (req, res) => {
//   try {
//     const postId = req.params.id;

//     const post = await Post.findById(postId);

//     if (!post) {
//       return res.status(404).json({ error: 'Post not found' });
//     }

//     res.json({ post });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
// app.get('/api/posts/:id', async (req, res) => {
//   try {
//     const postId = req.params.id;

//     const post = await Post.findById(postId);

//     if (!post) {
//       return res.status(404).json({ error: 'Post not found' });
//     }

//     res.json(post); // Return the post data as JSON
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

app.get('/post/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;

    const post = await Post.findOne({ postId });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Assuming you have the HTML content stored in the `fullPostHTML` variable
    const fullPostHTML =
      '<html><body><h1>' +
      post.title +
      '</h1><p>' +
      post.content +
      '</p></body></html>';

    res.send(fullPostHTML);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/posts', async (req, res) => {
  try {
    const { skip, limit } = req.query;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    const totalPosts = await Post.countDocuments();

    const formattedPosts = posts.map((post) => ({
      ...post._doc,
      formattedCreatedAt: post.formattedCreatedAt,
    }));

    res.json({ posts: formattedPosts, totalPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// app.get('/post/:postId', async (req, res) => {
//   try {
//     const postId = req.params.postId;

//     const post = await Post.findById(postId);

//     if (!post) {
//       return res.status(404).json({ error: 'Post not found' });
//     }
//     res.send(fullPostHTML);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

app.use('/admin', loginRouter, adminRoutes);
app.use(router);

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
