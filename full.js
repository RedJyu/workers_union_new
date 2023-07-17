// Retrieve the post ID from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

// Get the full post content based on the post ID (e.g., from an API)
// Replace the following code with your own logic to fetch the full post content
async function fetchPostContent(postId) {
  try {
    const response = await fetch(`http://localhost:3000/api/posts/${postId}`);
    const data = await response.json();
    return data.post;
  } catch (error) {
    console.error(error);
  }
}

// Display the full post content in the HTML page
const postContainer = document.getElementsByClassName('post-container');
const postTitleElement = document.getElementById('post-title');
const postContentElement = document.getElementById('post-content');

fetchPostContent(postId).then((post) => {
  if (post) {
    postTitleElement.textContent = post.title;
    postContentElement.textContent = post.content;
  } else {
    postContainer.innerHTML = '<h1>Post not found</h1>';
  }
});
