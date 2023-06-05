// Function to expand the content and show the full post
function expandContent(button) {
  const postContainer = button.parentNode;
  const postContent = postContainer.querySelector('.post-content');
  const expandedContent = postContainer.querySelector('.expanded-content');

  // Show the expanded content and hide the button
  postContent.style.display = 'none';
  expandedContent.style.display = 'block';
  button.style.display = 'none';
}

// Attach event listeners to the "Read more" buttons
const expandButtons = document.querySelectorAll('.post-expand-button');
expandButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    expandContent(this);
  });
});
