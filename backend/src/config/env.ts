import path from 'path';
import fs from 'fs';
import dns from 'dns';
import dotenv from 'dotenv';
import { z } from 'zod';

// Automatically locate and load backend/.env relative to this config directory
const backendEnvPath = path.resolve(__dirname, '../../.env');
const rootEnvPath = path.resolve(__dirname, '../../../.env');

if (fs.existsSync(backendEnvPath)) {
  dotenv.config({ path: backendEnvPath });
} else if (fs.existsSync(rootEnvPath)) {
  dotenv.config({ path: rootEnvPath });
} else {
  dotenv.config();
}

// Ensure early DNS configuration for Atlas SRV resolution across all connections
if (process.env.MONGODB_URI?.startsWith('mongodb+srv://')) {
  try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  } catch {
    // ignore
  }
}

const envSchema = z.object({
  PORT: z.string().default('5000').transform((val) => parseInt(val, 10)),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  MONGODB_URI: z
    .string({
      required_error:
        'MONGODB_URI is required. Please set MONGODB_URI in backend/.env (e.g. MongoDB Atlas connection string)',
      invalid_type_error: 'MONGODB_URI must be a string',
    })
    .min(1, 'MONGODB_URI cannot be empty'),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
  API_PREFIX: z.string().default('/api'),
  RATE_LIMIT_WINDOW_MS: z.string().default('900000').transform((val) => parseInt(val, 10)),
  RATE_LIMIT_MAX: z.string().default('100').transform((val) => parseInt(val, 10)),

  // Phase 4: Google OAuth & Session Security
  GOOGLE_CLIENT_ID: z
    .string({
      required_error: 'GOOGLE_CLIENT_ID is required for admin authentication',
    })
    .min(1, 'GOOGLE_CLIENT_ID cannot be empty'),
  GOOGLE_CLIENT_SECRET: z
    .string({
      required_error: 'GOOGLE_CLIENT_SECRET is required for admin authentication',
    })
    .min(1, 'GOOGLE_CLIENT_SECRET cannot be empty'),
  GOOGLE_CALLBACK_URL: z
    .string()
    .default('http://localhost:5000/api/auth/google/callback'),
  FRONTEND_URL: z.string().default('http://localhost:3000'),
  SESSION_SECRET: z
    .string({
      required_error: 'SESSION_SECRET is required (minimum 32 characters)',
    })
    .min(32, 'SESSION_SECRET must be at least 32 characters long'),
  ADMIN_ALLOWED_EMAILS: z
    .string()
    .default('')
    .transform((val) =>
      val
        .split(',')
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean)
    ),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((issue) => `  - ${issue.path.join('.') || 'env'}: ${issue.message}`)
    .join('\n');
  // eslint-disable-next-line no-console
  console.error(`\n❌ [CONFIGURATION ERROR] Invalid or missing environment variables:\n${issues}\n`);
  process.exit(1);
}

export const env = parsed.data;
