/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';
import { Service } from '../src/models/Service';
import { Industry } from '../src/models/Industry';
import { Client } from '../src/models/Client';
import { CaseStudy } from '../src/models/CaseStudy';
import { Blog } from '../src/models/Blog';
import { News } from '../src/models/News';
import { MediaMention } from '../src/models/MediaMention';
import { Award } from '../src/models/Award';
import { Gallery } from '../src/models/Gallery';
import { Career } from '../src/models/Career';
import { Office } from '../src/models/Office';
import { Settings } from '../src/models/Settings';

describe('Public Content API Endpoints', () => {
  it('GET /api/settings should return settings envelope with defaults even when DB empty', async () => {
    vi.spyOn(Settings, 'findOne').mockReturnValue({
      lean: vi.fn().mockResolvedValue(null),
    } as any);

    const res = await request(app).get('/api/settings');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.siteName).toBe('Kalka Co. Media Consultancy');
    expect(res.body.data.contactEmail).toBe('contact@kalka.co');
  });

  it('GET /api/services should return standard envelope with list', async () => {
    vi.spyOn(Service, 'find').mockReturnValue({
      sort: vi.fn().mockReturnThis(),
      skip: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      lean: vi.fn().mockResolvedValue([
        {
          name: 'Strategic Communications [SAMPLE]',
          slug: 'strategic-communications',
          shortDescription: 'Sample short desc',
          status: 'published',
        },
      ]),
    } as any);
    vi.spyOn(Service, 'countDocuments').mockResolvedValue(1 as any);

    const res = await request(app).get('/api/services');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.meta.total).toBe(1);
  });

  it('GET /api/services/:slug should return 404 for unknown slug', async () => {
    vi.spyOn(Service, 'findOne').mockReturnValue({
      lean: vi.fn().mockResolvedValue(null),
    } as any);

    const res = await request(app).get('/api/services/non-existent-slug');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('NOT_FOUND');
  });

  it('GET /api/industries should return standard envelope', async () => {
    vi.spyOn(Industry, 'find').mockReturnValue({
      sort: vi.fn().mockReturnThis(),
      skip: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      lean: vi.fn().mockResolvedValue([]),
    } as any);
    vi.spyOn(Industry, 'countDocuments').mockResolvedValue(0 as any);

    const res = await request(app).get('/api/industries');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('GET /api/clients should return standard envelope', async () => {
    vi.spyOn(Client, 'find').mockReturnValue({
      sort: vi.fn().mockReturnThis(),
      skip: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      lean: vi.fn().mockResolvedValue([]),
    } as any);
    vi.spyOn(Client, 'countDocuments').mockResolvedValue(0 as any);

    const res = await request(app).get('/api/clients');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('GET /api/case-studies should return standard envelope', async () => {
    vi.spyOn(CaseStudy, 'find').mockReturnValue({
      sort: vi.fn().mockReturnThis(),
      skip: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      lean: vi.fn().mockResolvedValue([]),
    } as any);
    vi.spyOn(CaseStudy, 'countDocuments').mockResolvedValue(0 as any);

    const res = await request(app).get('/api/case-studies');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('GET /api/blogs should return standard envelope', async () => {
    vi.spyOn(Blog, 'find').mockReturnValue({
      sort: vi.fn().mockReturnThis(),
      skip: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      lean: vi.fn().mockResolvedValue([]),
    } as any);
    vi.spyOn(Blog, 'countDocuments').mockResolvedValue(0 as any);

    const res = await request(app).get('/api/blogs');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('GET /api/news should return standard envelope', async () => {
    vi.spyOn(News, 'find').mockReturnValue({
      sort: vi.fn().mockReturnThis(),
      skip: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      lean: vi.fn().mockResolvedValue([]),
    } as any);
    vi.spyOn(News, 'countDocuments').mockResolvedValue(0 as any);

    const res = await request(app).get('/api/news');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('GET /api/media-mentions should return standard envelope', async () => {
    vi.spyOn(MediaMention, 'find').mockReturnValue({
      sort: vi.fn().mockReturnThis(),
      skip: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      lean: vi.fn().mockResolvedValue([]),
    } as any);
    vi.spyOn(MediaMention, 'countDocuments').mockResolvedValue(0 as any);

    const res = await request(app).get('/api/media-mentions');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('GET /api/awards should return standard envelope', async () => {
    vi.spyOn(Award, 'find').mockReturnValue({
      sort: vi.fn().mockReturnThis(),
      skip: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      lean: vi.fn().mockResolvedValue([]),
    } as any);
    vi.spyOn(Award, 'countDocuments').mockResolvedValue(0 as any);

    const res = await request(app).get('/api/awards');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('GET /api/gallery should return standard envelope', async () => {
    vi.spyOn(Gallery, 'find').mockReturnValue({
      sort: vi.fn().mockReturnThis(),
      skip: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      lean: vi.fn().mockResolvedValue([]),
    } as any);
    vi.spyOn(Gallery, 'countDocuments').mockResolvedValue(0 as any);

    const res = await request(app).get('/api/gallery');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('GET /api/careers should return standard envelope', async () => {
    vi.spyOn(Career, 'find').mockReturnValue({
      sort: vi.fn().mockReturnThis(),
      skip: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      lean: vi.fn().mockResolvedValue([]),
    } as any);
    vi.spyOn(Career, 'countDocuments').mockResolvedValue(0 as any);

    const res = await request(app).get('/api/careers');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('GET /api/offices should return standard envelope', async () => {
    vi.spyOn(Office, 'find').mockReturnValue({
      sort: vi.fn().mockReturnThis(),
      lean: vi.fn().mockResolvedValue([]),
    } as any);

    const res = await request(app).get('/api/offices');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
