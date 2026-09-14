import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';

describe('Health and System Endpoints', () => {
  it('GET / should return 200 with API welcome info', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toContain('Kalka Co.');
    expect(res.body.data.version).toBe('1.0.0');
  });

  it('GET /api/health should return 200 with service health status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('healthy');
    expect(res.body.data.uptime).toBeTypeOf('number');
    expect(res.body.data.timestamp).toBeDefined();
  });
});
