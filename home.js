import { fetchPosts } from './utility.js';
import { layoutAdmin } from './views/admin/layout.js';

export const home = async (req, res) => {
  try {
    // Get the current page from the request query parameters
    const currentPage = parseInt(req.query.page) || 1;
    const postsPerPage = 10;

    const posts = await fetchPosts();
    const totalPosts = posts.length;
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    // Calculate the start and end indices of the posts for the current page
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const currentPagePosts = posts.slice(startIndex, endIndex);

    let postsHTML = '';

    // Iterate over each post and create HTML markup
    currentPagePosts.forEach((post) => {
      postsHTML += `
      <div class="post-container">
          <h2 class="post-title">${post.title}</h2>
          <p class="post-content">${post.content}</p>
        </div>
      `;
    });

    // Generate pagination links
    let paginationHTML = '';
    for (let page = 1; page <= totalPages; page++) {
      paginationHTML += `<a href="?page=${page}">${page}</a> `;
    }

    res.send(
      layoutAdmin({
        content: `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Home Page</title>
      </head>
      <body>
        <h1>Posts</h1>
        ${postsHTML}

        <div>
          <p>${paginationHTML}</p>
        </div>
      </body>
      </html>
    `,
      })
    );
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
