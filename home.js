import { fetchPosts } from './utility.js';

export const home = async (req, res) => {
  try {
    const posts = await fetchPosts();
    let postsHTML = '';

    // Iterate over each post and create HTML markup
    posts.forEach((post) => {
      postsHTML += `
        <div>
          <h2>${post.title}</h2>
          <p>${post.content}</p>
        </div>
      `;
    });

    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Home Page</title>
      </head>
      <body>
        <h1>Posts</h1>
        ${postsHTML}
      </body>
      </html>
    `);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
