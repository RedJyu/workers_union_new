import { fetchPosts, fetchPostById } from './utility.js';
import { layoutUser } from './views/user/layout.js';

export const home = async (req, res) => {
  try {
    // Get the current page from the request query parameters
    const currentPage = parseInt(req.query.page) || 1;
    const postsPerPage = 5;

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
    <div class="left-column">
      <p class="post-time">${post.formattedCreatedAt}</p>
      <h2 class="post-title">${post.title}</h2>
     <p class="post-content">
    ${
      post.content.length > 100
        ? post.content.slice(0, 100) + '...'
        : post.content
    }
  </p>
    </div>
    <div class="right-column">
      <div class="link-container">
        ${
          post.content.length > 50
            ? `<a id="postMore" href="/post/${post.id}">więcej ></a>`
            : ''
        }
      </div>
    </div>
  </div>
  `;
    });

    // Generate pagination links
    let paginationHTML = '';
    for (let page = 1; page <= totalPages; page++) {
      paginationHTML += `<a ID="pagination" href="?page=${page}">${page}</a> `;
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
         <img src="logo.png" alt="Logo">
        <a href="#aktualnosci">Aktualności</a>
        <a href="#o-nas">O nas</a>
        <a href="#forum">Forum</a>
      </div class="card-container">
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
    const postId = req.params.id;
    const post = await fetchPostById(postId);

    res.send(
      layoutUser({
        content: `
        <html>
          <head>
            <title>Post - ${post.title}</title>
          </head>
          <body>
            <div class="post-container-full">
              <p class="post-time">${post.formattedCreatedAt}</p>
              <h2 class="post-title">${post.title}</h2>
              <p class="post-content-full">${post.content}</p>
              <a ID="goHome"href="/home">< wróć</a>
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
