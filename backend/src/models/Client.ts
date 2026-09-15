import { Schema, model, Document } from 'mongoose';

export type ClientApprovalStatus = 'PENDING_APPROVAL' | 'APPROVED' | 'RESTRICTED';
export type ClientStatus = 'published' | 'draft' | 'archived';

export interface IClient extends Document {
  name: string;
  slug: string;
  industry: string;
  shortDescription?: string;
  description?: string;
  services: string[];
  website?: string;
  logo?: string;
  logoAsset?: string;
  logoAlt?: string;
  confidentiality?: string;
  featured: boolean;
  displayOrder: number;
  approvalStatus: ClientApprovalStatus;
  status: ClientStatus;
  createdAt: Date;
  updatedAt: Date;
}

const ClientSchema = new Schema<IClient>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    industry: { type: String, required: true, trim: true },
    shortDescription: { type: String, trim: true },
    description: { type: String, trim: true },
    services: [{ type: String, trim: true }],
    website: { type: String, trim: true },
    logo: { type: String, trim: true },
    logoAsset: { type: String, trim: true },
    logoAlt: { type: String, trim: true },
    confidentiality: { type: String, trim: true },
    featured: { type: Boolean, default: false, index: true },
    displayOrder: { type: Number, default: 0, index: true },
    approvalStatus: {
      type: String,
      enum: ['PENDING_APPROVAL', 'APPROVED', 'RESTRICTED'],
      default: 'PENDING_APPROVAL',
      index: true,
    },
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

export const Client = model<IClient>('Client', ClientSchema);

