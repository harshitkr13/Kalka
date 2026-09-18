import { Request, Response, NextFunction } from 'express';
import { env } from '../../config/env';
import { authService } from './auth.service';
import { getRolePermissions } from './permissions';
import { generateOAuthState, verifyOAuthState, verifyBrowserNonceBinding } from './oauthState';
import { sendSuccess } from '../../utils/apiResponse';
import { AppError } from '../../utils/appError';
import { logger } from '../../utils/logger';

function getCookieValue(req: Request, name: string): string | undefined {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return undefined;
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

export const authController = {
  initiateGoogleAuth(req: Request, res: Response, next: NextFunction): void {
    try {
      const { state, nonce } = generateOAuthState(env.SESSION_SECRET);
      req.session.oauthState = state;
      req.session.oauthNonce = nonce;

      const isProduction = env.NODE_ENV === 'production' || Boolean(process.env.RENDER);

      // Dedicated short-lived browser-bound nonce cookie with SameSite=Lax
      res.cookie('kalka.oauth_nonce', nonce, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax',
        maxAge: 10 * 60 * 1000, // 10 minutes
        path: '/api/auth',
      });

      req.session.save((err) => {
        if (err) {
          logger.error('Failed to persist OAuth state in session:', err);
          return next(
            new AppError(
              'Authentication service is temporarily unavailable. Please try again shortly.',
              503,
              'DATABASE_UNAVAILABLE'
            )
          );
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

    const isProduction = env.NODE_ENV === 'production' || Boolean(process.env.RENDER);

    // 1. Retrieve browser-bound transaction nonce from cookie (primary) or session (secondary)
    const cookieNonce = getCookieValue(req, 'kalka.oauth_nonce');
    const sessionNonce = req.session?.oauthNonce;
    const browserNonce = cookieNonce || sessionNonce;

    // 2. Validate cryptographic state integrity and freshness (10-minute window)
    const stateResult = verifyOAuthState(state, env.SESSION_SECRET);

    // 3. Validate browser-bound transaction binding (CRITICAL: Prevents Login CSRF)
    const isBindingValid = Boolean(
      browserNonce &&
      stateResult.valid &&
      stateResult.nonce &&
      verifyBrowserNonceBinding(stateResult.nonce, browserNonce)
    );

    // 4. Single-Use Replay Protection: Immediately clear the transaction nonce cookie and session fields
    res.clearCookie('kalka.oauth_nonce', {
      path: '/api/auth',
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
    });

    if (req.session) {
      delete req.session.oauthState;
      delete req.session.oauthNonce;
    }

    // 5. Reject if state verification or browser binding failed
    if (!isBindingValid) {
      logger.warn(
        `OAuth state verification failed: hasBrowserNonce=${Boolean(browserNonce)}, stateValid=${stateResult.valid}, error=${stateResult.error || 'NONCE_MISMATCH'}`
      );
      return res.redirect(`${env.FRONTEND_URL}/admin/login?error=invalid_state`);
    }

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

          res.on('finish', () => {
            const rawSetCookie = res.getHeader('set-cookie');
            if (!rawSetCookie) {
              logger.warn('[AUTH CALLBACK RESPONSE]: Set-Cookie header is NOT present on response');
              return;
            }
            const cookies = Array.isArray(rawSetCookie) ? rawSetCookie : [String(rawSetCookie)];
            for (const c of cookies) {
              const parts = c.split(';').map((s) => s.trim());
              const cookieName = (parts[0] || '').split('=')[0];
              const hasSecure = parts.some((p) => p.toLowerCase() === 'secure');
              const hasHttpOnly = parts.some((p) => p.toLowerCase() === 'httponly');
              const hasPartitioned = parts.some((p) => p.toLowerCase() === 'partitioned');
              const sameSitePart = parts.find((p) => p.toLowerCase().startsWith('samesite='));
              const sameSiteVal = sameSitePart ? sameSitePart.split('=')[1] : 'none-specified';
              const pathPart = parts.find((p) => p.toLowerCase().startsWith('path='));
              const pathVal = pathPart ? pathPart.split('=')[1] : 'none-specified';

              logger.info(
                `[AUTH CALLBACK RESPONSE]: Set-Cookie header emitted -> name=${cookieName}, HttpOnly=${hasHttpOnly}, Secure=${hasSecure}, SameSite=${sameSiteVal}, Partitioned=${hasPartitioned}, Path=${pathVal}`
              );
            }
          });

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
