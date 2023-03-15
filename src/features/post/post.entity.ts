import mongoose from 'mongoose';
import { v4 } from 'uuid';

interface PostEntity {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly author: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date;
}

const postSchema = new mongoose.Schema<PostEntity>({
  id: { type: String, default: v4, unique: true, required: true },
  title: { type: String, default: '', required: true },
  content: { type: String, default: '', required: true },
  author: { type: String, default: '', required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date, default: null, required: false },
  deletedAt: { type: Date, default: null, required: false },
});

const PostRepository = mongoose.model('Post', postSchema);

export { PostEntity, PostRepository };
