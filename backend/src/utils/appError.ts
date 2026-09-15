export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errorCode: string;
  public readonly isOperational: boolean;
  public readonly details?: unknown;

  constructor(
    message: string,
    statusCode = 500,
    errorCode = 'INTERNAL_SERVER_ERROR',
    isOperational = true,
    details?: unknown
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = isOperational;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = 'Bad request', errorCode = 'BAD_REQUEST', details?: unknown): AppError {
    return new AppError(message, 400, errorCode, true, details);
  }

  static unauthorized(message = 'Authentication required', errorCode = 'UNAUTHORIZED'): AppError {
    return new AppError(message, 401, errorCode, true);
  }

  static forbidden(message = 'Access forbidden', errorCode = 'FORBIDDEN'): AppError {
    return new AppError(message, 403, errorCode, true);
  }

  static notFound(message = 'Resource not found', errorCode = 'NOT_FOUND'): AppError {
    return new AppError(message, 404, errorCode, true);
  }

  static conflict(message = 'Resource already exists', errorCode = 'CONFLICT'): AppError {
    return new AppError(message, 409, errorCode, true);
  }

  static validation(message = 'Validation failed', details?: unknown): AppError {
    return new AppError(message, 422, 'VALIDATION_ERROR', true, details);
  }

  static internal(message = 'Internal server error'): AppError {
    return new AppError(message, 500, 'INTERNAL_SERVER_ERROR', false);
  }
}
