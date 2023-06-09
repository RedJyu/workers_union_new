import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

postSchema.virtual('formattedCreatedAt').get(function () {
  return this.createdAt.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
});

const Post = mongoose.model('Post', postSchema);

export default Post;
