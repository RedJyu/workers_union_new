const postsContainer = document.getElementById('posts-container');
const currentPageElement = document.getElementById('currentPage');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

const toggleButton = document.getElementById('toggleButton');
const links = document.querySelector('.links');

const postsPerPage = 6; // Number of posts to display per page
let currentPage = 1;
let totalPosts = 0;
let totalPages = 0;

function fetchPosts(page) {
  const skip = (page - 1) * postsPerPage;

  fetch(`http://127.0.0.1:3000/api/posts?skip=${skip}&limit=${postsPerPage}`)
    .then((response) => response.json())
    .then((data) => {
      const posts = data.posts;
      totalPosts = data.totalPosts;
      totalPages = Math.ceil(totalPosts / postsPerPage);
      currentPageElement.textContent = `Page ${currentPage} of ${totalPages}`;
      currentPageElement.classList.add('pagination');

      postsContainer.innerHTML = '';

      posts.forEach((post) => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        const truncatedContent = truncateString(post.content, 100);

        const postImage = post.imageUrl ? post.imageUrl : 'default.jpg';

        postElement.innerHTML = `
        <p class="post-time">${post.formattedCreatedAt}</p>
        <div class="img">
        <img src="${postImage}" alt="Post Image" />
      </div>
      <h2>${post.title}</h2>
      <div class="underline"></div>
      <p class="post-content">${truncatedContent}</p>
      
    `;

        if (post.content.length > 100) {
          const fullContentButton = document.createElement('button');
          fullContentButton.textContent = 'Read Full Post';

          let isFullContentDisplayed = false;

          fullContentButton.addEventListener('click', () => {
            if (!isFullContentDisplayed) {
              postElement.querySelector('.post-content').textContent =
                post.content;
              fullContentButton.textContent = 'Collapse';
              isFullContentDisplayed = true;
            } else {
              postElement.querySelector('.post-content').textContent =
                truncatedContent;
              fullContentButton.textContent = 'Read Full Post';
              isFullContentDisplayed = false;
            }
          });

          postElement.appendChild(fullContentButton);
        }

        postsContainer.appendChild(postElement);
      });

      updatePaginationButtons();
    })
    .catch((error) => {
      console.error(error);
    });
}

function truncateString(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + '...';
}

function updatePaginationButtons() {
  if (currentPage === 1) {
    prevButton.style.display = 'none';
  } else {
    prevButton.style.display = 'block';
  }

  if (currentPage === totalPages) {
    nextButton.style.display = 'none';
  } else {
    nextButton.style.display = 'block';
  }
}

prevButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    fetchPosts(currentPage);
  }
});

nextButton.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    fetchPosts(currentPage);
  }
});

fetchPosts(currentPage);

toggleButton.addEventListener('click', function () {
  links.classList.toggle('show-links');
});
