import { Schema, model, Document } from 'mongoose';

export interface IBlogAuthor {
  name: string;
  role: string;
  avatar?: string;
}

export interface IBlog extends Document {
  title: string;
  slug: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  author: IBlogAuthor;
  coverImage?: string;
  category: string;
  tags: string[];
  featured: boolean;
  status: 'published' | 'draft' | 'archived';
  publishedAt: Date;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    subtitle: { type: String, trim: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    author: {
      name: { type: String, required: true, trim: true },
      role: { type: String, required: true, trim: true },
      avatar: { type: String, trim: true },
    },
    coverImage: { type: String, trim: true },
    category: { type: String, required: true, trim: true, index: true },
    tags: [{ type: String, trim: true }],
    featured: { type: Boolean, default: false, index: true },
    status: {
      type: String,
      enum: ['published', 'draft', 'archived'],
      default: 'published',
      index: true,
    },
    publishedAt: { type: Date, default: Date.now, index: true },
    seoTitle: { type: String, trim: true },
    seoDescription: { type: String, trim: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret: Record<string, unknown>) {
        const { __v: _v, ...clean } = ret;
        return clean;
      },
    },
  }
);

export const Blog = model<IBlog>('Blog', BlogSchema);
