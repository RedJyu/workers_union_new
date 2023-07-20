const pageButtons = (container, pages, activeIndex) => {
  let btns = pages.map((_, pageIndex) => {
    return `<button class="page-btn ${
      activeIndex === pageIndex ? 'active-btn' : 'null'
    }" data-index="${pageIndex}">${pageIndex + 1}</button>`;
  });
  btns.push('<button class="next-btn">>>></button>');
  btns.unshift('<button class="prev-btn"><<<</button>');
  container.innerHTML = btns.join('');
};

export default pageButtons;
