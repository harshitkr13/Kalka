/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';
import { Client } from '../src/models/Client';
import { TeamMember } from '../src/models/TeamMember';
import { MediaMention } from '../src/models/MediaMention';
import { Award } from '../src/models/Award';
import { Career } from '../src/models/Career';

describe('Phase 8 Institutional Content CMS & Public Feeds', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('Client Management & Approval Workflow', () => {
    it('Public GET /api/clients should suppress logo when approvalStatus is PENDING_APPROVAL', async () => {
      const mockClients = [
        {
          _id: '507f1f77bcf86cd799439001',
          name: 'Keventers',
          slug: 'keventers',
          industry: 'Hospitality',
          status: 'published',
          approvalStatus: 'PENDING_APPROVAL',
          logo: 'https://example.com/keventers-logo.png',
          logoAsset: '/assets/keventers.png',
        },
      ];

      vi.spyOn(Client, 'find').mockReturnValue({
        sort: vi.fn().mockReturnThis(),
        skip: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        lean: vi.fn().mockResolvedValue(mockClients),
      } as any);
      vi.spyOn(Client, 'countDocuments').mockResolvedValue(1);

      const res = await request(app).get('/api/clients');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBe(1);

      const client = res.body.data[0];
      expect(client.name).toBe('Keventers');
      expect(client.approvalStatus).toBe('PENDING_APPROVAL');
      // Logo and logoAsset must be stripped/undefined
      expect(client.logo).toBeUndefined();
      expect(client.logoAsset).toBeUndefined();
    });

    it('Public GET /api/clients should preserve logo when approvalStatus is APPROVED', async () => {
      const mockClients = [
        {
          _id: '507f1f77bcf86cd799439002',
          name: 'Approved Brand',
          slug: 'approved-brand',
          industry: 'Real Estate',
          status: 'published',
          approvalStatus: 'APPROVED',
          logo: 'https://example.com/logo.png',
          logoAsset: '/assets/brand.png',
        },
      ];

      vi.spyOn(Client, 'find').mockReturnValue({
        sort: vi.fn().mockReturnThis(),
        skip: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        lean: vi.fn().mockResolvedValue(mockClients),
      } as any);
      vi.spyOn(Client, 'countDocuments').mockResolvedValue(1);

      const res = await request(app).get('/api/clients');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      const client = res.body.data[0];
      expect(client.approvalStatus).toBe('APPROVED');
      expect(client.logo).toBe('https://example.com/logo.png');
      expect(client.logoAsset).toBe('/assets/brand.png');
    });

    it('GET /api/admin/clients should reject unauthenticated requests with 401', async () => {
      const res = await request(app).get('/api/admin/clients');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('UNAUTHORIZED');
    });

    it('PATCH /api/admin/clients/:id/approval should reject unauthenticated requests with 401', async () => {
      const res = await request(app)
        .patch('/api/admin/clients/507f1f77bcf86cd799439001/approval')
        .send({ approvalStatus: 'APPROVED' });
      expect(res.status).toBe(401);
    });
  });

  describe('Team / Leadership CMS', () => {
    it('Public GET /api/team should return 200 with standard envelope', async () => {
      vi.spyOn(TeamMember, 'find').mockReturnValue({
        sort: vi.fn().mockReturnThis(),
        skip: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        lean: vi.fn().mockResolvedValue([]),
      } as any);
      vi.spyOn(TeamMember, 'countDocuments').mockResolvedValue(0);

      const res = await request(app).get('/api/team');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('Public GET /api/team/:slug should return 404 for unknown slug', async () => {
      vi.spyOn(TeamMember, 'findOne').mockReturnValue({
        lean: vi.fn().mockResolvedValue(null),
      } as any);

      const res = await request(app).get('/api/team/unknown-leader');
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });

    it('GET /api/admin/team should reject unauthenticated requests with 401', async () => {
      const res = await request(app).get('/api/admin/team');
      expect(res.status).toBe(401);
    });
  });

  describe('Media Mentions CMS', () => {
    it('GET /api/admin/media should reject unauthenticated requests with 401', async () => {
      const res = await request(app).get('/api/admin/media');
      expect(res.status).toBe(401);
    });

    it('Public GET /api/media-mentions should only query published records', async () => {
      const findSpy = vi.spyOn(MediaMention, 'find').mockReturnValue({
        sort: vi.fn().mockReturnThis(),
        skip: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        lean: vi.fn().mockResolvedValue([]),
      } as any);
      vi.spyOn(MediaMention, 'countDocuments').mockResolvedValue(0);

      const res = await request(app).get('/api/media-mentions');
      expect(res.status).toBe(200);
      expect(findSpy).toHaveBeenCalledWith(expect.objectContaining({ status: 'published' }));
    });
  });

  describe('Awards CMS', () => {
    it('GET /api/admin/awards should reject unauthenticated requests with 401', async () => {
      const res = await request(app).get('/api/admin/awards');
      expect(res.status).toBe(401);
    });

    it('Public GET /api/awards should only query published records', async () => {
      const findSpy = vi.spyOn(Award, 'find').mockReturnValue({
        sort: vi.fn().mockReturnThis(),
        skip: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        lean: vi.fn().mockResolvedValue([]),
      } as any);
      vi.spyOn(Award, 'countDocuments').mockResolvedValue(0);

      const res = await request(app).get('/api/awards');
      expect(res.status).toBe(200);
      expect(findSpy).toHaveBeenCalledWith(expect.objectContaining({ status: 'published' }));
    });
  });

  describe('Careers CMS & Security', () => {
    it('GET /api/admin/careers should reject unauthenticated requests with 401', async () => {
      const res = await request(app).get('/api/admin/careers');
      expect(res.status).toBe(401);
    });

    it('Public GET /api/careers should query published and active postings', async () => {
      const findSpy = vi.spyOn(Career, 'find').mockReturnValue({
        sort: vi.fn().mockReturnThis(),
        skip: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        lean: vi.fn().mockResolvedValue([]),
      } as any);
      vi.spyOn(Career, 'countDocuments').mockResolvedValue(0);

      const res = await request(app).get('/api/careers');
      expect(res.status).toBe(200);
      expect(findSpy).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'published', active: true })
      );
    });
  });

  describe('Gallery / Asset Management CMS', () => {
    it('GET /api/admin/gallery should reject unauthenticated requests with 401', async () => {
      const res = await request(app).get('/api/admin/gallery');
      expect(res.status).toBe(401);
    });
  });
});
