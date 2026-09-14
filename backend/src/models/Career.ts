import { Schema, model, Document } from 'mongoose';

export interface ICareer extends Document {
  title: string;
  slug: string;
  department: string;
  location: string;
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  deadline?: string;
  active: boolean;
  status: 'published' | 'draft' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

const CareerSchema = new Schema<ICareer>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    department: { type: String, required: true, trim: true, index: true },
    location: { type: String, required: true, trim: true },
    employmentType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
      default: 'Full-time',
    },
    experience: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    requirements: [{ type: String, trim: true }],
    responsibilities: [{ type: String, trim: true }],
    deadline: { type: String, trim: true },
    active: { type: Boolean, default: true, index: true },
    status: {
      type: String,
      enum: ['published', 'draft', 'closed'],
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

export const Career = model<ICareer>('Career', CareerSchema);
