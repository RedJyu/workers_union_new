const container = document.querySelector('.container');

const displayPosts = (posts) => {
  const newPost = posts
    .map((post) => {
      const { content, createdAt, postId, imageUrl, title } = post;
      const defaultImg = '/default.jpg';
      return `<article class="card">
    <img src="${imageUrl ? imageUrl : defaultImg}" alt="${title}"/>
    <h3>${title}</h3>
    <a href="#" data-post-id="${postId}" class="button">więcej</a>
    </article>`;
    })
    .join('');
  container.innerHTML = newPost;

  container.addEventListener('click', (event) => {
    if (event.target.classList.contains('button')) {
      event.preventDefault();

      // Extract the postId from the data attribute of the clicked link
      const postId = event.target.getAttribute('data-post-id');

      // Redirect to the new page with full post content
      window.location.href = `full-post.html?id=${postId}`;
    }
  });
};
export default displayPosts;
