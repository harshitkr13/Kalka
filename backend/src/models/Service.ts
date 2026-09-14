import { Schema, model, Document } from 'mongoose';

export interface IProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface IService extends Document {
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  heroImage?: string;
  capabilities: string[];
  process: IProcessStep[];
  relatedIndustries: string[];
  featured: boolean;
  displayOrder: number;
  seoTitle?: string;
  seoDescription?: string;
  status: 'published' | 'draft' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    shortDescription: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    heroImage: { type: String, trim: true },
    capabilities: [{ type: String, trim: true }],
    process: [
      {
        step: { type: Number, required: true },
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
      },
    ],
    relatedIndustries: [{ type: String, trim: true }],
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

export const Service = model<IService>('Service', ServiceSchema);
