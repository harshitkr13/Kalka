import { env } from '../../config/env';
import { User, IUser, UserRole } from '../../models/User';
import { AppError } from '../../utils/appError';
import { logger } from '../../utils/logger';

export interface GoogleUserProfile {
  googleId: string;
  email: string;
  name: string;
  avatar?: string;
}

export const authService = {
  getGoogleAuthUrl(state: string): string {
    const params = new URLSearchParams({
      client_id: env.GOOGLE_CLIENT_ID,
      redirect_uri: env.GOOGLE_CALLBACK_URL,
      response_type: 'code',
      scope: 'openid email profile',
      state,
      access_type: 'online',
      prompt: 'select_account',
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  },

  async exchangeCodeForGoogleProfile(code: string): Promise<GoogleUserProfile> {
    try {
      // 1. Exchange authorization code for tokens
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code,
          client_id: env.GOOGLE_CLIENT_ID,
          client_secret: env.GOOGLE_CLIENT_SECRET,
          redirect_uri: env.GOOGLE_CALLBACK_URL,
          grant_type: 'authorization_code',
        }).toString(),
      });

      if (!tokenResponse.ok) {
        const errorData = await tokenResponse.text();
        logger.error('Google token exchange failed:', errorData);
        throw new AppError('Failed to exchange authorization code with Google', 401, 'OAUTH_EXCHANGE_FAILED');
      }

      const tokens = (await tokenResponse.json()) as { access_token: string; id_token?: string };
      if (!tokens.access_token) {
        throw new AppError('Google returned invalid token response', 401, 'OAUTH_TOKEN_INVALID');
      }

      // 2. Fetch user profile with the access token
      const userinfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      });

      if (!userinfoResponse.ok) {
        throw new AppError('Failed to retrieve user profile from Google', 401, 'OAUTH_PROFILE_FAILED');
      }

      const profileData = (await userinfoResponse.json()) as {
        sub: string;
        email: string;
        name?: string;
        picture?: string;
      };

      if (!profileData.sub || !profileData.email) {
        throw new AppError('Incomplete profile data received from Google', 400, 'OAUTH_PROFILE_INCOMPLETE');
      }

      return {
        googleId: profileData.sub,
        email: profileData.email.toLowerCase().trim(),
        name: profileData.name || profileData.email,
        avatar: profileData.picture,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      logger.error('Unexpected Google OAuth network error:', error);
      throw new AppError('Failed to communicate with Google authentication services', 502, 'EXTERNAL_AUTH_ERROR');
    }
  },

  async verifyAndSyncApprovedUser(profile: GoogleUserProfile): Promise<IUser> {
    const normalizedEmail = profile.email.toLowerCase().trim();

    // 1. Verify if email is in ADMIN_ALLOWED_EMAILS
    const isApproved = env.ADMIN_ALLOWED_EMAILS.includes(normalizedEmail);
    if (!isApproved) {
      logger.warn(`Unauthorized login attempt from unapproved Google account (email masked)`);
      throw new AppError(
        'Access denied. Your account is not authorized for administrative access.',
        403,
        'UNAUTHORIZED_ADMIN'
      );
    }

    // 2. Check for existing user in database
    let user = await User.findOne({
      $or: [{ googleId: profile.googleId }, { email: normalizedEmail }],
    });

    if (user) {
      // Existing user found: Check active status
      if (!user.active) {
        logger.warn(`Login attempt by deactivated user ID: ${user._id}`);
        throw new AppError(
          'Your administrative account has been deactivated. Please contact an administrator.',
          403,
          'ACCOUNT_DISABLED'
        );
      }

      // Update non-sensitive profile info while preserving existing role
      user.googleId = profile.googleId;
      user.name = profile.name;
      if (profile.avatar) user.avatar = profile.avatar;
      user.lastLoginAt = new Date();
      await user.save();

      return user;
    }

    // 3. New approved user: determine initial role
    const totalUsers = await User.countDocuments();
    // First user in the database receives SUPER_ADMIN; subsequent approved users receive EDITOR
    const initialRole: UserRole = totalUsers === 0 ? 'SUPER_ADMIN' : 'EDITOR';

    user = await User.create({
      googleId: profile.googleId,
      email: normalizedEmail,
      name: profile.name,
      avatar: profile.avatar,
      role: initialRole,
      active: true,
      lastLoginAt: new Date(),
    });

    logger.info(`New administrator provisioned with role ${initialRole}`);
    return user;
  },
};
