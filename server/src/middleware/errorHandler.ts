/**
 * Global error handler middleware
 * Catches all unhandled errors and returns consistent error responses
 */

import type { Request, Response, NextFunction } from 'express';

export interface ApiError extends Error {
  statusCode?: number;
}

export function errorHandler(
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Log the error
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // Determine status code
  const statusCode = err.statusCode ?? 500;

  // Send error response
  res.status(statusCode).json({
    error: {
      message: err.message || 'Internal server error',
      statusCode,
    },
  });
}

/**
 * Creates an API error with a status code
 */
export function createApiError(message: string, statusCode: number): ApiError {
  const error: ApiError = new Error(message);
  error.statusCode = statusCode;
  return error;
}
