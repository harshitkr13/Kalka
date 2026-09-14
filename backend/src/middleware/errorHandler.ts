import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';
import { sendError } from '../utils/apiResponse';
import { logger } from '../utils/logger';
import { env } from '../config/env';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response {
  if (err instanceof AppError) {
    if (err.statusCode >= 500) {
      logger.error(`[AppError ${err.statusCode}] ${err.errorCode}: ${err.message}`);
    }
    return sendError(res, err.statusCode, err.errorCode, err.message, err.details);
  }

  // Handle Mongoose CastError (e.g. invalid ObjectId)
  if (typeof err === 'object' && err !== null && 'name' in err && (err as { name: string }).name === 'CastError') {
    return sendError(res, 400, 'INVALID_IDENTIFIER', 'Invalid ID format provided');
  }

  // Handle Mongoose duplicate key error (code 11000)
  if (typeof err === 'object' && err !== null && 'code' in err && (err as { code: number }).code === 11000) {
    return sendError(res, 409, 'DUPLICATE_RESOURCE', 'A resource with this key already exists');
  }

  // Handle Mongoose ValidationError
  if (typeof err === 'object' && err !== null && 'name' in err && (err as { name: string }).name === 'ValidationError') {
    return sendError(res, 422, 'VALIDATION_ERROR', 'Database validation failed');
  }

  // Handle JSON parsing errors in body
  if (err instanceof SyntaxError && 'status' in err && (err as { status: number }).status === 400) {
    return sendError(res, 400, 'INVALID_JSON', 'Malformed JSON payload');
  }

  // Unknown unexpected error
  logger.error('Unhandled Exception:', err);
  const message = env.NODE_ENV === 'production' ? 'Internal server error' : (err instanceof Error ? err.message : 'Internal server error');
  return sendError(res, 500, 'INTERNAL_SERVER_ERROR', message);
}
