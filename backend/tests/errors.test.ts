import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';

describe('Centralized Error Handling & Security', () => {
  it('GET /api/non-existent-route should return 404 with ENDPOINT_NOT_FOUND', async () => {
    const res = await request(app).get('/api/non-existent-route');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('ENDPOINT_NOT_FOUND');
    expect(res.body.error.message).toContain('Endpoint not found');
  });

  it('Error response should never expose internal stack trace', async () => {
    const res = await request(app).get('/api/completely-unknown-route-12345');
    expect(res.status).toBe(404);
    expect(res.body.error.stack).toBeUndefined();
  });

  it('Security headers (Helmet) should be present in responses', async () => {
    const res = await request(app).get('/api/health');
    expect(res.headers['x-dns-prefetch-control']).toBeDefined();
    expect(res.headers['x-frame-options']).toBeDefined();
    expect(res.headers['x-content-type-options']).toBe('nosniff');
  });
});
