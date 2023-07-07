const postsContainer = document.getElementById('posts-container');
const currentPageElement = document.getElementById('currentPage');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

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

      postsContainer.innerHTML = '';

      posts.forEach((post) => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.content}</p>
          <hr>
        `;
        postsContainer.appendChild(postElement);
      });

      updatePaginationButtons();
    })
    .catch((error) => {
      console.error(error);
    });
}

function updatePaginationButtons() {
  if (currentPage === 1) {
    prevButton.disabled = true;
  } else {
    prevButton.disabled = false;
  }

  if (currentPage === totalPages) {
    nextButton.disabled = true;
  } else {
    nextButton.disabled = false;
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
