import rateLimit from 'express-rate-limit';
import { env } from '../config/env';
import { AppError } from '../utils/appError';

export const apiLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, _res, next) => {
    next(new AppError('Too many requests, please try again later.', 429, 'RATE_LIMIT_EXCEEDED'));
  },
});

export const contactSubmissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // max 10 submissions per IP per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, _res, next) => {
    next(
      new AppError(
        'Too many inquiry submissions from this address. Please wait a few minutes or contact us directly via email or telephone.',
        429,
        'RATE_LIMIT_EXCEEDED'
      )
    );
  },
});
