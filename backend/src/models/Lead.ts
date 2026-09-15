import { Schema, model, Document, Types } from 'mongoose';

export type LeadEnquiryType = 'GENERAL' | 'SERVICE' | 'MEDIA' | 'PARTNERSHIP' | 'CAREERS' | 'OTHER';
export type LeadUrgency = 'standard' | 'priority' | 'crisis';
export type LeadSource = 'CONTACT_FORM' | 'SERVICE_ENQUIRY' | 'WHATSAPP' | 'EMAIL_CTA' | 'OTHER';
export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL' | 'WON' | 'LOST' | 'CLOSED';
export type LeadPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface ILeadNote {
  _id?: Types.ObjectId;
  author: string;
  authorId?: Types.ObjectId;
  content: string;
  createdAt: Date;
}

export interface ILead extends Document {
  fullName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  company: string;
  designation?: string;
  enquiryType: LeadEnquiryType;
  service?: string;
  serviceSlug?: string;
  industry?: string;
  urgency: LeadUrgency;
  message: string;
  source: LeadSource;
  sourcePage?: string;
  status: LeadStatus;
  priority: LeadPriority;
  assignedTo?: Types.ObjectId;
  notes: ILeadNote[];
  consent: boolean;
  lastContactedAt?: Date;
  closedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const LeadNoteSchema = new Schema<ILeadNote>(
  {
    author: { type: String, required: true, trim: true },
    authorId: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const LeadSchema = new Schema<ILead>(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, index: true },
    phone: { type: String, required: true, trim: true },
    whatsapp: { type: String, trim: true },
    company: { type: String, required: true, trim: true },
    designation: { type: String, trim: true },
    enquiryType: {
      type: String,
      enum: ['GENERAL', 'SERVICE', 'MEDIA', 'PARTNERSHIP', 'CAREERS', 'OTHER'],
      default: 'GENERAL',
      index: true,
    },
    service: { type: String, trim: true },
    serviceSlug: { type: String, trim: true, index: true },
    industry: { type: String, trim: true },
    urgency: {
      type: String,
      enum: ['standard', 'priority', 'crisis'],
      default: 'standard',
    },
    message: { type: String, required: true, trim: true },
    source: {
      type: String,
      enum: ['CONTACT_FORM', 'SERVICE_ENQUIRY', 'WHATSAPP', 'EMAIL_CTA', 'OTHER'],
      default: 'CONTACT_FORM',
      index: true,
    },
    sourcePage: { type: String, trim: true },
    status: {
      type: String,
      enum: ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'WON', 'LOST', 'CLOSED'],
      default: 'NEW',
      index: true,
    },
    priority: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
      default: 'MEDIUM',
      index: true,
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    notes: [LeadNoteSchema],
    consent: { type: Boolean, required: true, default: true },
    lastContactedAt: { type: Date },
    closedAt: { type: Date },
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

// Compound index for search and sorting
LeadSchema.index({ createdAt: -1, status: 1 });
LeadSchema.index({ email: 1, createdAt: -1 });

export const Lead = model<ILead>('Lead', LeadSchema);
