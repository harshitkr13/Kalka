/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';
import { Client } from '../src/models/Client';
import { TeamMember } from '../src/models/TeamMember';
import { MediaMention } from '../src/models/MediaMention';
import { Award } from '../src/models/Award';
import { Career } from '../src/models/Career';
import { Gallery } from '../src/models/Gallery';
import { CaseStudy } from '../src/models/CaseStudy';

describe('Phase 8 Institutional Content CMS & Public Feeds', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('Client Management & Approval Workflow', () => {
    it('Public GET /api/clients should only query approved and published clients', async () => {
      const findSpy = vi.spyOn(Client, 'find').mockReturnValue({
        select: vi.fn().mockReturnThis(),
        sort: vi.fn().mockReturnThis(),
        skip: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        lean: vi.fn().mockResolvedValue([]),
      } as any);
      vi.spyOn(Client, 'countDocuments').mockResolvedValue(0);

      const res = await request(app).get('/api/clients');
      expect(res.status).toBe(200);
      expect(findSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'published',
          approvalStatus: 'APPROVED',
        })
      );
    });

    it('Public GET /api/clients should return approved clients with their logos and omit confidentiality', async () => {
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
        select: vi.fn().mockReturnThis(),
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
      expect((client as any).confidentiality).toBeUndefined();
    });

    it('Public GET /api/clients/:slug should require approvalStatus APPROVED and return 404 for unapproved/unknown clients', async () => {
      const findOneSpy = vi.spyOn(Client, 'findOne').mockReturnValue({
        select: vi.fn().mockReturnThis(),
        lean: vi.fn().mockResolvedValue(null),
      } as any);

      const res = await request(app).get('/api/clients/pending-brand');
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(findOneSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          slug: 'pending-brand',
          status: 'published',
          approvalStatus: 'APPROVED',
        })
      );
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

  describe('Case Studies CMS', () => {
    it('Public GET /api/case-studies should query published case studies', async () => {
      const findSpy = vi.spyOn(CaseStudy, 'find').mockReturnValue({
        sort: vi.fn().mockReturnThis(),
        skip: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        lean: vi.fn().mockResolvedValue([]),
      } as any);
      vi.spyOn(CaseStudy, 'countDocuments').mockResolvedValue(0);

      const res = await request(app).get('/api/case-studies');
      expect(res.status).toBe(200);
      expect(findSpy).toHaveBeenCalledWith(expect.objectContaining({ status: 'published' }));
    });

    it('GET /api/admin/case-studies should reject unauthenticated requests with 401', async () => {
      const res = await request(app).get('/api/admin/case-studies');
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
    it('Public GET /api/gallery should return published gallery assets', async () => {
      const mockGalleryItems = [
        {
          _id: '507f1f77bcf86cd799439010',
          title: 'Press Conference',
          category: 'Events',
          imageUrl: '/assets/gallery/photo1.webp',
          status: 'published',
        },
      ];

      vi.spyOn(Gallery, 'find').mockReturnValue({
        sort: vi.fn().mockReturnThis(),
        skip: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        lean: vi.fn().mockResolvedValue(mockGalleryItems),
      } as any);
      vi.spyOn(Gallery, 'countDocuments').mockResolvedValue(1);

      const res = await request(app).get('/api/gallery');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].title).toBe('Press Conference');
    });

    it('GET /api/admin/gallery should reject unauthenticated requests with 401', async () => {
      const res = await request(app).get('/api/admin/gallery');
      expect(res.status).toBe(401);
    });
  });
});
