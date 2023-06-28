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
      const shortenedContent =
        post.content.length > 100
          ? post.content.slice(0, 100) + '...'
          : post.content;
      const postImage = post.imageUrl ? post.imageUrl : 'default.jpg';

      postsHTML += `
    <div class="post-container">
      <p class="post-time">${post.formattedCreatedAt}</p>
      <div class="img">
        <img src="${postImage}" alt="Post Image" />
      </div>
      <h2 class="post-title">${post.title}</h2>
      <p class="post-content">${shortenedContent}</p>
      
      ${
        post.content.length > 50
          ? `
          <button class="read-more-button" data-post-id="${post.id}">więcej ></button>
          <div class="full-content" id="post-${post.id}" style="display: none;">
            <p class="post-content-full">${post.content}</p>
            <a class="go-back-button" href="#">wróć</a>
          </div>
        `
          : ''
      }
    </div>
  `;
    });

    // Generate pagination links
    let paginationHTML = '';

    // Add Previous Page link if not on the first page
    if (currentPage > 1) {
      paginationHTML += `<a ID="pagination" href="?page=${
        currentPage - 1
      }">&lt;</a> `;
    }

    // Add pagination links
    for (let page = 1; page <= totalPages; page++) {
      // Display all pages except the current page
      if (page === currentPage) {
        paginationHTML += `<span class="current-page">${page}</span> `;
      } else {
        paginationHTML += `<a ID="pagination" href="?page=${page}">${page}</a> `;
      }
    }

    // Add Next Page link if not on the last page
    if (currentPage < totalPages) {
      paginationHTML += `<a ID="pagination" href="?page=${
        currentPage + 1
      }">&gt;</a> `;
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
      <div class="pagination current-page">${paginationHTML}</div>
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

export const viewPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await fetchPostById(postId);

    res.send(
      layoutUser({
        content: `
        <html>
          <head>
            <title> ${post.title}</title>
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
