import { Schema, model, Document } from 'mongoose';

export interface IGalleryItem extends Document {
  title: string;
  caption?: string;
  category: string;
  imageUrl: string;
  filename?: string;
  altText?: string;
  fileSize?: number;
  mimeType?: string;
  width?: number;
  height?: number;
  aspectRatio: 'landscape' | 'portrait' | 'square';
  tags: string[];
  featured: boolean;
  displayOrder: number;
  status: 'published' | 'draft' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const GallerySchema = new Schema<IGalleryItem>(
  {
    title: { type: String, required: true, trim: true },
    caption: { type: String, trim: true },
    category: { type: String, required: true, trim: true, index: true },
    imageUrl: { type: String, required: true, trim: true },
    filename: { type: String, trim: true },
    altText: { type: String, trim: true },
    fileSize: { type: Number },
    mimeType: { type: String, trim: true },
    width: { type: Number },
    height: { type: Number },
    aspectRatio: {
      type: String,
      enum: ['landscape', 'portrait', 'square'],
      default: 'landscape',
    },
    tags: [{ type: String, trim: true }],
    featured: { type: Boolean, default: false, index: true },
    displayOrder: { type: Number, default: 0, index: true },
    status: {
      type: String,
      enum: ['published', 'draft', 'archived'],
      default: 'draft',
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

export const Gallery = model<IGalleryItem>('Gallery', GallerySchema);
