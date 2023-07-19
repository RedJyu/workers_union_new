const url = 'http://127.0.0.1:3000/api/posts';

const fetchItems = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default fetchItems;
