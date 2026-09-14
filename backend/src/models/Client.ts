import { Schema, model, Document } from 'mongoose';

export interface IClient extends Document {
  name: string;
  logo?: string;
  industry: string;
  description?: string;
  website?: string;
  featured: boolean;
  displayOrder: number;
  status: 'published' | 'draft';
  createdAt: Date;
  updatedAt: Date;
}

const ClientSchema = new Schema<IClient>(
  {
    name: { type: String, required: true, trim: true },
    logo: { type: String, trim: true },
    industry: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    website: { type: String, trim: true },
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

export const Client = model<IClient>('Client', ClientSchema);
