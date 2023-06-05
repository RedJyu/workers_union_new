import { fetchPosts, fetchPostById } from './utility.js';
import { layoutUser } from './views/user/layout.js';

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
  <p class="post-time">${post.formattedCreatedAt}</p>
  <h2 class="post-title">${post.title}</h2>
  <p class="post-content">
    ${
      post.content.length > 50
        ? post.content.slice(0, 50) + '...'
        : post.content
    }
  </p>
  ${post.content.length > 50 ? `<a href="/post/${post.id}">Read more</a>` : ''}
</div>
      `;
    });

    // Generate pagination links
    let paginationHTML = '';
    for (let page = 1; page <= totalPages; page++) {
      paginationHTML += `<a href="?page=${page}">${page}</a> `;
    }

    res.send(
      layoutUser({
        content: `
    <html>
      <head>
        <title>Związek Zawodowy US Grójec</title>
      </head>
    <body>
       <div class="navbar">
         <img src="logo.png" alt="Logo" style="height: 40px; width: auto;">
        <a href="#aktualnosci">Aktualności</a>
        <a href="#o-nas">O nas</a>
        <a href="#forum">Forum</a>
      </div class="card-container">
    <h1 class="main">Aktualności</h1>
         ${postsHTML}
         </div>
   <div>
      <p>${paginationHTML}</p>
    </div>
    <script src="utilTest.js"></script>
    <script src="postUtil.js"></script>
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

export const viewPost = async (req, res) => {
  try {
    const postId = req.params.id; // Assuming you have a post ID
    const post = await fetchPostById(postId);

    res.send(
      layoutUser({
        content: `
        <html>
          <head>
            <title>Post - ${post.title}</title>
          </head>
          <body>
            <div class="post-container">
              <p class="post-time">${post.formattedCreatedAt}</p>
              <h2 class="post-title">${post.title}</h2>
              <p class="post-content">${post.content}</p>
              <a href="/home">Go to Home</a>
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
