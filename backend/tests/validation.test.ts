import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';

describe('Zod Request Validation Middleware', () => {
  it('GET /api/services?featured=invalid should return 422 with validation error details', async () => {
    const res = await request(app).get('/api/services?featured=invalid');
    expect(res.status).toBe(422);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
    expect(Array.isArray(res.body.error.details)).toBe(true);
    expect(res.body.error.details[0].field).toBe('featured');
  });

  it('GET /api/media-mentions?type=unsupported should return 422 with validation error', async () => {
    const res = await request(app).get('/api/media-mentions?type=unsupported');
    expect(res.status).toBe(422);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });
});
