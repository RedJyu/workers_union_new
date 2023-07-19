import fetchItems from './fetch.js';
import displayPosts from './displayPosts.js';

const title = document.querySelector('.section-title h1');

const toggleButton = document.getElementById('toggleButton');

toggleButton.addEventListener('click', function () {
  const links = document.querySelector('.links');
  links.classList.toggle('show-links');
});
const init = async () => {
  const data = await fetchItems();
  const posts = data.posts.reverse();
  console.log(posts);
  displayPosts(posts);
  title.textContent = 'Aktualności';
};

window.addEventListener('load', init);
