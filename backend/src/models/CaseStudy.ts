import { Schema, model, Document } from 'mongoose';

export interface ICaseMetric {
  label: string;
  value: string;
}

export interface ICaseStudy extends Document {
  title: string;
  slug: string;
  clientName: string;
  industry: string;
  summary: string;
  challenge: string;
  strategy: string;
  execution: string;
  results: string;
  metrics: ICaseMetric[];
  coverImage?: string;
  gallery: string[];
  mediaCoverage: string[];
  featured: boolean;
  status: 'published' | 'draft' | 'archived';
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CaseStudySchema = new Schema<ICaseStudy>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    clientName: { type: String, required: true, trim: true },
    industry: { type: String, required: true, trim: true },
    summary: { type: String, required: true, trim: true },
    challenge: { type: String, required: true, trim: true },
    strategy: { type: String, required: true, trim: true },
    execution: { type: String, required: true, trim: true },
    results: { type: String, required: true, trim: true },
    metrics: [
      {
        label: { type: String, required: true, trim: true },
        value: { type: String, required: true, trim: true },
      },
    ],
    coverImage: { type: String, trim: true },
    gallery: [{ type: String, trim: true }],
    mediaCoverage: [{ type: String, trim: true }],
    featured: { type: Boolean, default: false, index: true },
    status: {
      type: String,
      enum: ['published', 'draft', 'archived'],
      default: 'published',
      index: true,
    },
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

export const CaseStudy = model<ICaseStudy>('CaseStudy', CaseStudySchema);
