const pageButtons = (container, pages, activeIndex) => {
  let btns = pages.map((_, pageIndex) => {
    return `<button class="page-btn ${
      activeIndex === pageIndex ? 'active-btn' : 'null'
    }" data-index="${pageIndex}">${pageIndex + 1}</button>`;
  });
  btns.push(
    '<button class="next-btn"><i class="fa-sharp fa-solid fa-chevron-right"></i></button>'
  );
  btns.unshift(
    '<button class="prev-btn"><i class="fa-sharp fa-solid fa-chevron-left"></i></button>'
  );
  container.innerHTML = btns.join('');
};

export default pageButtons;
