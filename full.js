// Retrieve the post ID from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

async function fetchPostContent(postId) {
  try {
    const response = await fetch(`http://localhost:3000/api/posts/${postId}`);
    const data = await response.json();
    return data.post;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const postContainer = document.getElementsByClassName('post-container')[0];
const postTitleElement = document.getElementById('post-title');
const postContentElement = document.getElementById('post-content');
const postTitle = document.getElementById('post-title-full');
const postTitleFullElement = document.getElementById('post-title-full');

fetchPostContent(postId).then((post) => {
  if (post) {
    postTitleElement.textContent = post.title;
    postTitleFullElement.textContent = post.title;

    // Sanitize the HTML content using DOMPurify and set it to the "post-content" div
    postContentElement.innerHTML = DOMPurify.sanitize(post.content);
  } else {
    postContainer.innerHTML = '<h1>Post not found</h1>';
  }
});
