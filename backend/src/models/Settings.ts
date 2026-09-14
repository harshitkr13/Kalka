import { Schema, model, Document } from 'mongoose';

export interface ISettings extends Document {
  siteName: string;
  siteTagline: string;
  contactEmail: string;
  contactPhone: string;
  primaryOffice: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
  seoDefaults: {
    title: string;
    description: string;
    ogImage?: string;
  };
  isMaintenanceMode: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    siteName: { type: String, default: 'Kalka Co. Media Consultancy', trim: true },
    siteTagline: { type: String, default: 'Strategic Media Consultancy', trim: true },
    contactEmail: { type: String, default: 'contact@kalka.co', trim: true },
    contactPhone: { type: String, default: '+91 11 0000 0000', trim: true },
    primaryOffice: { type: String, default: 'New Delhi', trim: true },
    socialLinks: {
      linkedin: { type: String, trim: true },
      twitter: { type: String, trim: true },
      instagram: { type: String, trim: true },
      youtube: { type: String, trim: true },
    },
    seoDefaults: {
      title: { type: String, default: 'Kalka Co. — Strategic Media Consultancy', trim: true },
      description: {
        type: String,
        default: 'High-stakes media consultancy and strategic communications advisory.',
        trim: true,
      },
      ogImage: { type: String, trim: true },
    },
    isMaintenanceMode: { type: Boolean, default: false },
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

export const Settings = model<ISettings>('Settings', SettingsSchema);
