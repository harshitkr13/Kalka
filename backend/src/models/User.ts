import { Schema, model, Document } from 'mongoose';

export type UserRole =
  | 'SUPER_ADMIN'
  | 'CONTENT_MANAGER'
  | 'EDITOR'
  | 'LEAD_MANAGER'
  | 'HR_MANAGER';

export const USER_ROLES: UserRole[] = [
  'SUPER_ADMIN',
  'CONTENT_MANAGER',
  'EDITOR',
  'LEAD_MANAGER',
  'HR_MANAGER',
];

export interface IUser extends Document {
  googleId: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  active: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: USER_ROLES,
      default: 'EDITOR',
      required: true,
      index: true,
    },
    active: {
      type: Boolean,
      default: true,
      required: true,
      index: true,
    },
    lastLoginAt: {
      type: Date,
      default: Date.now,
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

export const User = model<IUser>('User', UserSchema);
