import { Schema, model, Document } from 'mongoose';

export interface IIndustry extends Document {
  name: string;
  slug: string;
  description: string;
  heroImage?: string;
  relatedServices: string[];
  caseStudies: string[];
  featured: boolean;
  displayOrder: number;
  seoTitle?: string;
  seoDescription?: string;
  status: 'published' | 'draft' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const IndustrySchema = new Schema<IIndustry>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    description: { type: String, required: true, trim: true },
    heroImage: { type: String, trim: true },
    relatedServices: [{ type: String, trim: true }],
    caseStudies: [{ type: String, trim: true }],
    featured: { type: Boolean, default: false, index: true },
    displayOrder: { type: Number, default: 0, index: true },
    seoTitle: { type: String, trim: true },
    seoDescription: { type: String, trim: true },
    status: {
      type: String,
      enum: ['published', 'draft', 'archived'],
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

export const Industry = model<IIndustry>('Industry', IndustrySchema);
