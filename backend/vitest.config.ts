import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    testTimeout: 10000,
    env: {
      NODE_ENV: 'test',
      MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://mock-test:mock-pass@cluster0.test.mongodb.net/test',
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || 'mock-google-client-id.apps.googleusercontent.com',
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || 'mock-google-client-secret-value',
      GOOGLE_CALLBACK_URL: 'http://localhost:5000/api/auth/google/callback',
      FRONTEND_URL: 'http://localhost:3000',
      SESSION_SECRET: process.env.SESSION_SECRET || 'test_session_secret_min_32_characters_long_for_vitest_mocking',
      ADMIN_ALLOWED_EMAILS: 'admin@kalka.co,editor@kalka.co',
    },
  },
});
