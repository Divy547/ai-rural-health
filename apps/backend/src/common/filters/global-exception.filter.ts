import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PinoLogger } from 'nestjs-pino';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext(GlobalExceptionFilter.name);
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';
    let errors: string[] = [];

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else {
        const res = exceptionResponse as {
          message?: string | string[];
          error?: string;
        };

        if (Array.isArray(res.message)) {
          errors = res.message;
          message = res.error ?? 'Validation failed';
        } else if (typeof res.message === 'string') {
          message = res.message;
        }
      }
    }

    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      const error =
        exception instanceof Error
          ? {
            name: exception.name,
            message: exception.message,
            stack: exception.stack,
          }
          : {
            exception,
          };

      this.logger.error(
        {
          error,
          requestId: request.id,
          method: request.method,
          path: request.originalUrl,
        },
        'Unhandled exception',
      );
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      errors,
      timestamp: new Date().toISOString(),
      path: request.originalUrl,
      requestId: request.id,
    });
  }
}
