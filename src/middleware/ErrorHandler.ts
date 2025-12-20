import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../utils/CustomErrors';

/**
 * Global Error Handler Middleware
 */
export class ErrorHandler {
  /**
   * Handle all errors and return appropriate HTTP status codes
   */
  static handle(err: any, req: Request, res: Response, next: NextFunction): void {
    console.error('Error:', err);

    // If headers already sent, delegate to default Express error handler
    if (res.headersSent) {
      return next(err);
    }

    // Handle custom HTTP errors
    if (err instanceof HttpError) {
      res.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message,
      });
      return;
    }

    // Handle Prisma errors
    if (err.code) {
      return ErrorHandler.handlePrismaError(err, res);
    }

    // Handle validation errors
    if (err.name === 'ValidationError') {
      res.status(422).json({
        status: 422,
        message: err.message || 'Validation failed',
        errors: err.errors,
      });
      return;
    }

    // Default to 500 Internal Server Error
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';

    res.status(statusCode).json({
      status: statusCode,
      message: message,
    });
  }

  /**
   * Handle Prisma-specific errors
   */
  private static handlePrismaError(err: any, res: Response): void {
    switch (err.code) {
      case 'P2002':
        // Unique constraint violation
        res.status(409).json({
          status: 409,
          message: `Duplicate entry: ${err.meta?.target || 'field'} already exists`,
        });
        break;

      case 'P2025':
        // Record not found
        res.status(404).json({
          status: 404,
          message: 'Resource not found',
        });
        break;

      case 'P2003':
        // Foreign key constraint violation
        res.status(400).json({
          status: 400,
          message: `Invalid reference: ${err.meta?.field_name || 'related record'} does not exist`,
        });
        break;

      case 'P2014':
        // Required relation violation
        res.status(400).json({
          status: 400,
          message: 'Required relation is missing',
        });
        break;

      default:
        res.status(500).json({
          status: 500,
          message: 'Database error occurred',
        });
    }
  }
}
