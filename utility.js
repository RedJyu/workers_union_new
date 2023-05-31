import Post from './postSchema.js';

export async function fetchPosts() {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return posts;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
