import { Schema, model, Document } from 'mongoose';

export interface INews extends Document {
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  source?: string;
  externalUrl?: string;
  coverImage?: string;
  featured: boolean;
  status: 'published' | 'draft' | 'archived';
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const NewsSchema = new Schema<INews>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    summary: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true, index: true },
    source: { type: String, trim: true },
    externalUrl: { type: String, trim: true },
    coverImage: { type: String, trim: true },
    featured: { type: Boolean, default: false, index: true },
    status: {
      type: String,
      enum: ['published', 'draft', 'archived'],
      default: 'published',
      index: true,
    },
    publishedAt: { type: Date, default: Date.now, index: true },
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

export const News = model<INews>('News', NewsSchema);
