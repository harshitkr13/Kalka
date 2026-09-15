import { Schema, model, Document } from 'mongoose';

export interface IAward extends Document {
  name: string;
  organization: string;
  year: number;
  category: string;
  description: string;
  image?: string;
  externalUrl?: string;
  featured: boolean;
  displayOrder: number;
  status: 'published' | 'draft' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const AwardSchema = new Schema<IAward>(
  {
    name: { type: String, required: true, trim: true },
    organization: { type: String, required: true, trim: true },
    year: { type: Number, required: true, index: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, trim: true },
    externalUrl: { type: String, trim: true },
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

export const Award = model<IAward>('Award', AwardSchema);
