const paginate = (posts) => {
  const itemsOnPage = 10;
  const numberOfPages = Math.ceil(posts.length / itemsOnPage);
  const newPosts = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsOnPage;
    return posts.slice(start, start + itemsOnPage);
  });
  return newPosts;
};
export default paginate;
