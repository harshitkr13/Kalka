import { Schema, model, Document } from 'mongoose';

export interface IMediaMention extends Document {
  title: string;
  publication: string;
  date: string;
  url?: string;
  excerpt: string;
  coverImage?: string;
  type: 'quote' | 'feature' | 'interview' | 'mention';
  featured: boolean;
  displayOrder: number;
  status: 'published' | 'draft';
  createdAt: Date;
  updatedAt: Date;
}

const MediaMentionSchema = new Schema<IMediaMention>(
  {
    title: { type: String, required: true, trim: true },
    publication: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    url: { type: String, trim: true },
    excerpt: { type: String, required: true, trim: true },
    coverImage: { type: String, trim: true },
    type: {
      type: String,
      enum: ['quote', 'feature', 'interview', 'mention'],
      default: 'mention',
    },
    featured: { type: Boolean, default: false, index: true },
    displayOrder: { type: Number, default: 0, index: true },
    status: {
      type: String,
      enum: ['published', 'draft'],
      default: 'published',
      index: true,
    },
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

export const MediaMention = model<IMediaMention>('MediaMention', MediaMentionSchema);
