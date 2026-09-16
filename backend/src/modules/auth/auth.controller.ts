import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { env } from '../../config/env';
import { authService } from './auth.service';
import { getRolePermissions } from './permissions';
import { sendSuccess } from '../../utils/apiResponse';
import { AppError } from '../../utils/appError';
import { logger } from '../../utils/logger';

export const authController = {
  initiateGoogleAuth(req: Request, res: Response, next: NextFunction): void {
    try {
      const state = crypto.randomBytes(32).toString('hex');
      req.session.oauthState = state;

      req.session.save((err) => {
        if (err) {
          logger.error('Failed to persist OAuth state in session:', err);
          return next(new AppError('Authentication service is temporarily unavailable. Please try again shortly.', 503, 'DATABASE_UNAVAILABLE'));
        }
        const authUrl = authService.getGoogleAuthUrl(state);
        res.redirect(authUrl);
      });
    } catch (error) {
      next(error);
    }
  },

  async handleGoogleCallback(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { code, state, error: googleError } = req.query as {
      code?: string;
      state?: string;
      error?: string;
    };

    if (googleError) {
      logger.warn(`Google OAuth error returned: ${googleError}`);
      return res.redirect(`${env.FRONTEND_URL}/admin/login?error=access_denied`);
    }

    if (!code || !state) {
      return res.redirect(`${env.FRONTEND_URL}/admin/login?error=missing_credentials`);
    }

    // CSRF State validation
    const savedState = req.session?.oauthState;
    if (!savedState || savedState !== state) {
      logger.warn('OAuth state mismatch detected (possible CSRF attempt)');
      return res.redirect(`${env.FRONTEND_URL}/admin/login?error=invalid_state`);
    }

    // Clear state after validation
    delete req.session.oauthState;

    try {
      // Exchange authorization code for Google profile
      const profile = await authService.exchangeCodeForGoogleProfile(code);

      // Verify approved administrator and load/provision user
      const user = await authService.verifyAndSyncApprovedUser(profile);

      // Session Fixation Protection: Regenerate session after successful authentication
      req.session.regenerate((regenErr) => {
        if (regenErr) {
          logger.error('Failed to regenerate session on login:', regenErr);
          return res.redirect(`${env.FRONTEND_URL}/admin/login?error=session_error`);
        }

        req.session.userId = String(user._id);

        req.session.save((saveErr) => {
          if (saveErr) {
            logger.error('Failed to save session on login:', saveErr);
            res.redirect(`${env.FRONTEND_URL}/admin/login?error=session_error`);
            return;
          }

          logger.info(`User authenticated successfully: ${user.role}`);
          logger.info(
            `[AUTH CALLBACK]: Session established: id=${req.sessionID ? req.sessionID.slice(0, 8) + '...' : 'none'}, userId=${req.session.userId}, secure=${req.secure}, protocol=${req.protocol}`
          );
          res.redirect(`${env.FRONTEND_URL}/admin`);
          return;
        });
      });
    } catch (err: unknown) {
      if (err instanceof AppError) {
        if (err.errorCode === 'UNAUTHORIZED_ADMIN') {
          res.redirect(`${env.FRONTEND_URL}/admin/login?error=unauthorized`);
          return;
        }
        if (err.errorCode === 'ACCOUNT_DISABLED') {
          res.redirect(`${env.FRONTEND_URL}/admin/login?error=disabled`);
          return;
        }
      }
      logger.error('Authentication callback error:', err);
      res.redirect(`${env.FRONTEND_URL}/admin/login?error=auth_failed`);
      return;
    }
  },

  getCurrentUser(req: Request, res: Response, next: NextFunction): void {
    try {
      if (!req.user) {
        logger.warn(
          `[AUTH ME]: Unauthorized check - hasSession=${Boolean(req.session)}, sessionID=${req.sessionID ? req.sessionID.slice(0, 8) + '...' : 'none'}, hasCookieHeader=${Boolean(req.headers.cookie)}`
        );
        throw new AppError('Authentication required.', 401, 'UNAUTHORIZED');
      }

      sendSuccess(
        res,
        {
          id: req.user._id,
          email: req.user.email,
          name: req.user.name,
          avatar: req.user.avatar,
          role: req.user.role,
          permissions: getRolePermissions(req.user.role),
          lastLoginAt: req.user.lastLoginAt,
        },
        'Current authenticated user retrieved successfully'
      );
    } catch (error) {
      next(error);
    }
  },

  logout(req: Request, res: Response, next: NextFunction): void {
    try {
      const isProd = env.NODE_ENV === 'production' || Boolean(process.env.RENDER);
      const cookieOptions = {
        path: '/',
        httpOnly: true,
        secure: isProd,
        sameSite: (isProd ? 'none' : 'lax') as 'none' | 'lax',
        partitioned: isProd,
      };

      if (req.session) {
        req.session.destroy((err) => {
          if (err) {
            logger.error('Error destroying session during logout:', err);
            return next(new AppError('Failed to sign out properly', 500, 'LOGOUT_ERROR'));
          }
          res.clearCookie('kalka.sid', cookieOptions);
          sendSuccess(res, { loggedOut: true }, 'Signed out successfully');
          return;
        });
      } else {
        res.clearCookie('kalka.sid', cookieOptions);
        sendSuccess(res, { loggedOut: true }, 'Signed out successfully');
        return;
      }
    } catch (error) {
      next(error);
    }
  },
};
