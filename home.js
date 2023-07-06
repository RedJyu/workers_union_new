import { fetchPosts, fetchPostById } from './utility.js';
import { layoutUser } from './views/user/layout.js';
import generatePaginationHTML from './pagination.js';

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
      <div class="underline"></div>
      <p class="post-content">${shortenedContent}</p>
      
    ${
      post.content.length > 50
        ? `
    <button class="read-more-button" onclick="window.location.href='/post/${post.id}'">więcej ></button>
  `
        : ''
    }
    </div>
  `;
    });
    const paginationHTML = generatePaginationHTML(currentPage, totalPages);

    res.send(
      layoutUser({
        content: `
    <html>
      <head>
        <title>Związek Zawodowy US Grójec</title>
      </head>
    <body>
   <nav>
        <div class="nav-center">
            <div class="nav-header">
                <h4 class="logo">Związek Zawodowy U. S. <span>Grójec</span></h4>
                <button type="button" class="nav-toggle"><i class="fas fa-bars"></i>
                </button>
            </div>
            <ul class="links">
                <li><a href="/home">Aktualności</a></li>
                <li><a href="/about">O Nas</a></li>
                <li><a href="/forum">Forum</a></li>
            </ul>
        </div>
    </nav>
      <div class="card-container">
         ${postsHTML}
       </div>
   <div>
      <div class="pagination current-page">${paginationHTML}</div>
    </div>
   <footer>
  <p>&copy; 2023 Piotr Stężycki.  Wszelkie prawa zastrzeżone.</p>
</footer>
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
    <title>${post.title}</title>
  </head>
  <body>
    <div class="post-container-full">
      <p class="post-time">${post.formattedCreatedAt}</p>
      <h2 class="post-title">${post.title}</h2>
      <pre class="post-content-full">${post.content}</pre>
      <button id="goHome" onclick="window.location.href='/home'">&lt; Wróć</button>
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
