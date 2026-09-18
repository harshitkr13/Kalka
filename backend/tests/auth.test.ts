/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';
import { User } from '../src/models/User';
import { authService } from '../src/modules/auth/auth.service';
import { generateOAuthState } from '../src/modules/auth/oauthState';
import { hasPermission, getRolePermissions } from '../src/modules/auth/permissions';
import { env } from '../src/config/env';

describe('Google OAuth & Authentication Module', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('GET /api/auth/google (Initiation)', () => {
    it('should redirect to Google OAuth with state, client_id, and redirect_uri', async () => {
      const res = await request(app).get('/api/auth/google');
      expect(res.status).toBe(302);
      expect(res.headers.location).toContain('https://accounts.google.com/o/oauth2/v2/auth');
      expect(res.headers.location).toContain('client_id=');
      expect(res.headers.location).toContain('redirect_uri=');
      expect(res.headers.location).toContain('state=');
      expect(res.headers.location).toContain('scope=openid+email+profile');

      // Verify kalka.oauth_nonce cookie is set with SameSite=Lax and Path=/api/auth
      const cookies = res.headers['set-cookie'] || [];
      const nonceCookie = cookies.find((c: string) => c.includes('kalka.oauth_nonce='));
      expect(nonceCookie).toBeDefined();
      expect(nonceCookie).toContain('Path=/api/auth');
      expect(nonceCookie).toContain('HttpOnly');
      expect(nonceCookie).toContain('SameSite=Lax');
    });
  });

  describe('GET /api/auth/google/callback (Callback Validation)', () => {
    it('should redirect to error if code or state is missing', async () => {
      const res = await request(app).get('/api/auth/google/callback');
      expect(res.status).toBe(302);
      expect(res.headers.location).toContain('/admin/login?error=missing_credentials');
    });

    it('should redirect to error on OAuth state mismatch (CSRF protection)', async () => {
      const res = await request(app)
        .get('/api/auth/google/callback?code=mock_code&state=invalid_state')
        .set('Cookie', ['kalka.sid=some_session']);
      expect(res.status).toBe(302);
      expect(res.headers.location).toContain('/admin/login?error=invalid_state');
    });

    it('should reject valid HMAC state if kalka.oauth_nonce cookie is missing (Login CSRF defense)', async () => {
      const { state } = generateOAuthState(env.SESSION_SECRET);
      // Valid HMAC state provided, but NO browser nonce cookie sent
      const res = await request(app)
        .get(`/api/auth/google/callback?code=mock_code&state=${state}`);
      expect(res.status).toBe(302);
      expect(res.headers.location).toContain('/admin/login?error=invalid_state');
    });

    it('should reject valid HMAC state if kalka.oauth_nonce cookie belongs to a different session (Mismatched transaction)', async () => {
      const { state } = generateOAuthState(env.SESSION_SECRET);
      const wrongNonce = '1111111111111111111111111111111111111111111111111111111111111111';
      const res = await request(app)
        .get(`/api/auth/google/callback?code=mock_code&state=${state}`)
        .set('Cookie', [`kalka.oauth_nonce=${wrongNonce}`]);
      expect(res.status).toBe(302);
      expect(res.headers.location).toContain('/admin/login?error=invalid_state');
    });

    it('should accept matching nonce and proceed past state validation, then clear nonce cookie', async () => {
      const { state, nonce } = generateOAuthState(env.SESSION_SECRET);
      // Code is mock so Google exchange fails with auth_failed, but state verification passes!
      const res = await request(app)
        .get(`/api/auth/google/callback?code=mock_code&state=${state}`)
        .set('Cookie', [`kalka.oauth_nonce=${nonce}`]);
      expect(res.status).toBe(302);
      // Fails at auth exchange (mock_code), NOT invalid_state
      expect(res.headers.location).toContain('/admin/login?error=auth_failed');

      // Verify kalka.oauth_nonce cookie is cleared
      const cookies = res.headers['set-cookie'] || [];
      const clearedNonce = cookies.find((c: string) => c.includes('kalka.oauth_nonce='));
      expect(clearedNonce).toBeDefined();
    });

    it('should reject unapproved email not in ADMIN_ALLOWED_EMAILS', async () => {
      await expect(
        authService.verifyAndSyncApprovedUser({
          googleId: '12345',
          email: 'stranger@gmail.com',
          name: 'Stranger',
        })
      ).rejects.toThrow(/Access denied/);
    });

    it('should reject deactivated/disabled user accounts', async () => {
      vi.spyOn(User, 'findOne').mockResolvedValue({
        _id: 'user_disabled_id',
        email: 'admin@kalka.co',
        active: false,
        role: 'EDITOR',
      } as any);

      await expect(
        authService.verifyAndSyncApprovedUser({
          googleId: '12345',
          email: 'admin@kalka.co',
          name: 'Disabled Admin',
        })
      ).rejects.toThrow(/deactivated/);
    });

    it('should preserve existing user role on login without overwriting', async () => {
      const saveSpy = vi.fn().mockResolvedValue(true);
      vi.spyOn(User, 'findOne').mockResolvedValue({
        _id: 'existing_user_id',
        googleId: 'existing_google_id',
        email: 'admin@kalka.co',
        name: 'Existing Admin',
        role: 'LEAD_MANAGER',
        active: true,
        save: saveSpy,
      } as any);

      const user = await authService.verifyAndSyncApprovedUser({
        googleId: 'existing_google_id',
        email: 'admin@kalka.co',
        name: 'Updated Name',
      });

      expect(user.role).toBe('LEAD_MANAGER');
      expect(saveSpy).toHaveBeenCalled();
    });

    it('should provision first approved user as SUPER_ADMIN', async () => {
      vi.spyOn(User, 'findOne').mockResolvedValue(null);
      vi.spyOn(User, 'countDocuments').mockResolvedValue(0);
      const createSpy = vi.spyOn(User, 'create').mockImplementation((data: any) =>
        Promise.resolve({ ...data, _id: 'new_super_admin_id' } as any)
      );

      const user = await authService.verifyAndSyncApprovedUser({
        googleId: 'new_google_id',
        email: 'admin@kalka.co',
        name: 'First Admin',
      });

      expect(user.role).toBe('SUPER_ADMIN');
      expect(createSpy).toHaveBeenCalled();
    });
  });

  describe('GET /api/auth/me (Current User Profile)', () => {
    it('should return 401 UNAUTHORIZED when no session exists', async () => {
      const res = await request(app).get('/api/auth/me');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('UNAUTHORIZED');
    });
  });

  describe('POST /api/auth/logout (Session Invalidation)', () => {
    it('should successfully clear session and return success envelope', async () => {
      const res = await request(app).post('/api/auth/logout');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.loggedOut).toBe(true);
      expect(res.headers['set-cookie']).toBeDefined();
    });
  });

  describe('RBAC & Permissions Matrix', () => {
    it('SUPER_ADMIN should hold all permissions', () => {
      const permissions = getRolePermissions('SUPER_ADMIN');
      expect(permissions).toContain('content:publish');
      expect(permissions).toContain('users:manage');
      expect(permissions).toContain('settings:manage');
      expect(permissions).toContain('leads:manage');
      expect(permissions).toContain('careers:manage');
    });

    it('EDITOR should have content:edit but NOT users:manage or content:publish', () => {
      expect(hasPermission('EDITOR', 'content:edit')).toBe(true);
      expect(hasPermission('EDITOR', 'content:view')).toBe(true);
      expect(hasPermission('EDITOR', 'content:publish')).toBe(false);
      expect(hasPermission('EDITOR', 'users:manage')).toBe(false);
    });

    it('LEAD_MANAGER should only have leads permissions', () => {
      expect(hasPermission('LEAD_MANAGER', 'leads:manage')).toBe(true);
      expect(hasPermission('LEAD_MANAGER', 'content:edit')).toBe(false);
      expect(hasPermission('LEAD_MANAGER', 'users:manage')).toBe(false);
    });

    it('HR_MANAGER should only have careers permissions', () => {
      expect(hasPermission('HR_MANAGER', 'careers:manage')).toBe(true);
      expect(hasPermission('HR_MANAGER', 'leads:manage')).toBe(false);
    });
  });
});
