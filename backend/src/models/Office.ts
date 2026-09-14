import { Schema, model, Document } from 'mongoose';

export interface IOffice extends Document {
  name: string;
  city: string;
  country: string;
  address: string;
  phone?: string;
  email?: string;
  isHeadquarters: boolean;
  displayOrder: number;
  status: 'published' | 'draft';
  createdAt: Date;
  updatedAt: Date;
}

const OfficeSchema = new Schema<IOffice>(
  {
    name: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    email: { type: String, trim: true },
    isHeadquarters: { type: Boolean, default: false },
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

export const Office = model<IOffice>('Office', OfficeSchema);
