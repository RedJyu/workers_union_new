import fetchItems from './fetch.js';
import displayPosts from './displayPosts.js';
import paginate from './paginate.js';
import pageButtons from './pageButtons.js';

const title = document.querySelector('.section-title h1');
const btnContainer = document.querySelector('.btn-container');

let index = 0;
let pages = [];

const setupUI = () => {
  displayPosts(pages[index]);
  pageButtons(btnContainer, pages, index);
};

const toggleButton = document.getElementById('toggleButton');

toggleButton.addEventListener('click', function () {
  const links = document.querySelector('.links');
  links.classList.toggle('show-links');
});

const init = async () => {
  const data = await fetchItems();
  const posts = data.posts.reverse();
  console.log(posts);
  title.textContent = 'Aktualności';
  pages = paginate(posts);
  setupUI();
};

btnContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('btn-container')) return;
  if (e.target.classList.contains('page-btn')) {
    index = parseInt(e.target.dataset.index);
    window.scrollTo(0, 0);
  }
  if (e.target.classList.contains('next-btn')) {
    index++;
    window.scrollTo(0, 0);
    if (index > pages.length - 1) {
      return;
    }
  }
  if (e.target.classList.contains('prev-btn')) {
    index--;
    window.scrollTo(0, 0);
    if (index < 0) {
      return;
    }
  }
  setupUI();
});

window.addEventListener('load', init);
