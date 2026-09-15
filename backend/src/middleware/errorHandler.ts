import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
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

  if (err instanceof ZodError) {
    const details = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    return sendError(res, 422, 'VALIDATION_ERROR', 'Request validation failed', details);
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

  // Handle Database connection/network errors cleanly without leaking internals or crashing
  const isDbError =
    (typeof err === 'object' && err !== null && 'name' in err && (
      (err as { name: string }).name === 'MongoServerSelectionError' ||
      (err as { name: string }).name === 'MongoNetworkError' ||
      (err as { name: string }).name === 'MongoTimeoutError' ||
      (err as { name: string }).name === 'MongooseServerSelectionError'
    )) ||
    (err instanceof Error && (
      err.message.includes('Could not connect to any servers') ||
      err.message.includes('SSL alert number 80') ||
      err.message.includes('topology was destroyed') ||
      err.message.includes('buffering timed out')
    ));

  if (isDbError) {
    logger.error('Database service unavailable for request:', err instanceof Error ? err.message : 'Database connection failure');
    return sendError(
      res,
      503,
      'DATABASE_UNAVAILABLE',
      'Database service is temporarily unavailable. Please verify network access or try again shortly.'
    );
  }

  // Unknown unexpected error
  logger.error('Unhandled Exception:', err);
  const message = env.NODE_ENV === 'production' ? 'Internal server error' : (err instanceof Error ? err.message : 'Internal server error');
  return sendError(res, 500, 'INTERNAL_SERVER_ERROR', message);
}
