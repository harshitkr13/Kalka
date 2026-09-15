import { Request, Response, NextFunction } from 'express';
import { User, IUser, UserRole } from '../models/User';
import { Permission, hasAllPermissions } from '../modules/auth/permissions';
import { AppError } from '../utils/appError';

declare module 'express-session' {
  interface SessionData {
    userId?: string;
    oauthState?: string;
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export async function authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.session?.userId;
    if (!userId) {
      throw new AppError('Authentication required. Please sign in.', 401, 'UNAUTHORIZED');
    }

    const user = await User.findById(userId);
    if (!user) {
      req.session.destroy(() => {});
      res.clearCookie('connect.sid');
      throw new AppError('User account not found. Please sign in again.', 401, 'UNAUTHORIZED');
    }

    if (!user.active) {
      req.session.destroy(() => {});
      res.clearCookie('connect.sid');
      throw new AppError('Your account has been deactivated. Access denied.', 403, 'ACCOUNT_DISABLED');
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

export function requireRole(...allowedRoles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new AppError('Authentication required.', 401, 'UNAUTHORIZED'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError('Forbidden. Insufficient role permissions for this operation.', 403, 'FORBIDDEN')
      );
    }

    next();
  };
}

export function requirePermission(...requiredPermissions: Permission[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new AppError('Authentication required.', 401, 'UNAUTHORIZED'));
    }

    if (!hasAllPermissions(req.user.role, requiredPermissions)) {
      return next(
        new AppError('Forbidden. You do not possess the required permission.', 403, 'FORBIDDEN')
      );
    }

    next();
  };
}
