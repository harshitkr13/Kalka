import { Schema, model, Document } from 'mongoose';

export type TeamMemberStatus = 'published' | 'draft' | 'archived';

export interface ITeamMember extends Document {
  name: string;
  slug: string;
  designation: string;
  bio: string;
  photo?: string;
  expertise: string[];
  linkedinUrl?: string;
  email?: string;
  displayOrder: number;
  featured: boolean;
  status: TeamMemberStatus;
  createdAt: Date;
  updatedAt: Date;
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    designation: { type: String, required: true, trim: true },
    bio: { type: String, required: true, trim: true },
    photo: { type: String, trim: true },
    expertise: [{ type: String, trim: true }],
    linkedinUrl: { type: String, trim: true },
    email: { type: String, trim: true },
    displayOrder: { type: Number, default: 0, index: true },
    featured: { type: Boolean, default: false, index: true },
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

export const TeamMember = model<ITeamMember>('TeamMember', TeamMemberSchema);
