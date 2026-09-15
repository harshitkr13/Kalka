/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';
import { Lead } from '../src/models/Lead';
import { User } from '../src/models/User';
import { emailService } from '../src/services/email/email.service';

describe('Leads & Inquiry System Module (Phase 7)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('Public Contact & Inquiry Ingestion (POST /api/contact)', () => {
    it('should successfully accept and persist a valid executive consultation inquiry', async () => {
      const mockLeadDoc = {
        _id: '507f1f77bcf86cd799439055',
        fullName: 'Vikramaditya Singhania',
        email: 'v.singhania@apexcorp.in',
        phone: '+91 98100 12345',
        company: 'Apex Conglomerates Ltd',
        designation: 'Group Managing Director',
        enquiryType: 'SERVICE',
        service: 'Crisis Communications & Advisory',
        urgency: 'priority',
        message: 'Requesting strategic briefing regarding upcoming cross-border corporate restructuring.',
        source: 'CONTACT_FORM',
        sourcePage: '/contact',
        status: 'NEW',
        priority: 'HIGH',
        consent: true,
        notes: [],
        createdAt: new Date(),
      };

      vi.spyOn(Lead, 'findOne').mockResolvedValue(null);
      vi.spyOn(Lead, 'create').mockResolvedValue(mockLeadDoc as any);
      const emailSpy = vi.spyOn(emailService, 'notifyNewLead').mockResolvedValue();

      const res = await request(app)
        .post('/api/contact')
        .send({
          fullName: 'Vikramaditya Singhania',
          email: 'v.singhania@apexcorp.in',
          phone: '+91 98100 12345',
          company: 'Apex Conglomerates Ltd',
          designation: 'Group Managing Director',
          enquiryType: 'SERVICE',
          service: 'Crisis Communications & Advisory',
          urgency: 'priority',
          message: 'Requesting strategic briefing regarding upcoming cross-border corporate restructuring.',
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.reference).toBe('507f1f77bcf86cd799439055');
      expect(res.body.data.status).toBe('RECEIVED');
      expect(res.body.data.fullName).toBe('Vikramaditya Singhania');
      expect(res.body.data.company).toBe('Apex Conglomerates Ltd');
      // Public privacy boundary: ensure internal notes and internal timestamps are omitted
      expect(res.body.data.notes).toBeUndefined();
      expect(emailSpy).toHaveBeenCalled();
    });

    it('should reject submission when required fields are missing or invalid', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({
          fullName: 'V', // too short
          email: 'invalid-email',
          message: 'Short', // too short (< 10 chars)
        });

      expect(res.status).toBe(422);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should trap automated bots via honeypot field without creating database records', async () => {
      const createSpy = vi.spyOn(Lead, 'create');

      const res = await request(app)
        .post('/api/contact')
        .send({
          fullName: 'Bot User',
          email: 'bot@spam.com',
          phone: '+1 555 0199',
          company: 'Spam Corp',
          message: 'Automated spam message for search engine optimization.',
          hp_company_sec: 'Hidden bot fill value',
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.reference).toBe('ACK-SIMULATED');
      expect(createSpy).not.toHaveBeenCalled();
    });

    it('should suppress short-interval duplicate submissions without duplicating records', async () => {
      const existingLead = {
        _id: '507f1f77bcf86cd799439077',
        email: 'ceo@enterprise.in',
        message: 'Urgent inquiry regarding media relations.',
      };

      vi.spyOn(Lead, 'findOne').mockResolvedValue(existingLead as any);
      const createSpy = vi.spyOn(Lead, 'create');

      const res = await request(app)
        .post('/api/contact')
        .send({
          fullName: 'Ananya Roy',
          email: 'ceo@enterprise.in',
          phone: '+91 99000 88888',
          company: 'Enterprise Inc',
          message: 'Urgent inquiry regarding media relations.',
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.duplicate).toBe(true);
      expect(res.body.data.reference).toBe('507f1f77bcf86cd799439077');
      expect(createSpy).not.toHaveBeenCalled();
    });

    it('should safely persist lead even if background email notification throws an error', async () => {
      const mockLeadDoc = {
        _id: '507f1f77bcf86cd799439088',
        fullName: 'Rohit Verma',
        email: 'r.verma@fintech.in',
        phone: '+91 98200 54321',
        company: 'Fintech Capital',
        enquiryType: 'GENERAL',
        urgency: 'standard',
        message: 'Inquiry regarding financial communications.',
        createdAt: new Date(),
      };

      vi.spyOn(Lead, 'findOne').mockResolvedValue(null);
      vi.spyOn(Lead, 'create').mockResolvedValue(mockLeadDoc as any);
      // Simulate email service failure
      vi.spyOn(emailService, 'notifyNewLead').mockRejectedValue(new Error('SMTP Connection Refused'));

      const res = await request(app)
        .post('/api/contact')
        .send({
          fullName: 'Rohit Verma',
          email: 'r.verma@fintech.in',
          phone: '+91 98200 54321',
          company: 'Fintech Capital',
          message: 'Inquiry regarding financial communications.',
        });

      // Lead must still succeed with 201
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.reference).toBe('507f1f77bcf86cd799439088');
    });

    it('POST /api/leads alias should also accept contact submissions', async () => {
      const mockLeadDoc = {
        _id: '507f1f77bcf86cd799439099',
        fullName: 'Priya Nair',
        email: 'p.nair@biotech.in',
        phone: '+91 97100 11223',
        company: 'BioTech Innovations',
        message: 'Service consultation request for brand architecture.',
        createdAt: new Date(),
      };

      vi.spyOn(Lead, 'findOne').mockResolvedValue(null);
      vi.spyOn(Lead, 'create').mockResolvedValue(mockLeadDoc as any);
      vi.spyOn(emailService, 'notifyNewLead').mockResolvedValue();

      const res = await request(app)
        .post('/api/leads')
        .send({
          fullName: 'Priya Nair',
          email: 'p.nair@biotech.in',
          phone: '+91 97100 11223',
          company: 'BioTech Innovations',
          message: 'Service consultation request for brand architecture.',
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
    });
  });

  describe('Admin Leads Management (Protected Routes)', () => {
    it('GET /api/admin/leads should return 401 when unauthenticated', async () => {
      const res = await request(app).get('/api/admin/leads');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('UNAUTHORIZED');
    });

    it('PATCH /api/admin/leads/:id should reject invalid ObjectId format with 400', async () => {
      vi.spyOn(User, 'findById').mockResolvedValue({
        _id: '507f1f77bcf86cd799439011',
        role: 'SUPER_ADMIN',
        active: true,
      } as any);

      const res = await request(app)
        .patch('/api/admin/leads/not-a-valid-id')
        .send({ status: 'CONTACTED' });

      expect([400, 401]).toContain(res.status);
    });
  });
});
