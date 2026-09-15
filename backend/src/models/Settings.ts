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
    siteTagline: { type: String, default: 'Strategic Communication. Lasting Impact.', trim: true },
    contactEmail: { type: String, default: 'djdurgesh8@gmail.com', trim: true },
    contactPhone: { type: String, default: '+91 87450 01570 / +91 76830 15257', trim: true },
    primaryOffice: { type: String, default: 'Faridabad, Haryana 121003', trim: true },
    socialLinks: {
      linkedin: { type: String, trim: true },
      twitter: { type: String, trim: true },
      instagram: { type: String, trim: true },
      youtube: { type: String, trim: true },
    },
    seoDefaults: {
      title: {
        type: String,
        default: 'Kalka Co. Media Consultancy — Strategic Communication. Lasting Impact.',
        trim: true,
      },
      description: {
        type: String,
        default:
          'Kalka Co. Media Consultancy is a strategic communications and public relations consultancy focused on helping businesses, brands, organizations and industry leaders build visibility, strengthen reputation and create meaningful engagement through strategic communication, media relations and reputation management.',
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
