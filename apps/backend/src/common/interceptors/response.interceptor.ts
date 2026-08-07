import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, unknown> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();

    return next.handle().pipe(
      map((data: T) => ({
        success: true,
        message: 'Success',
        timestamp: new Date().toISOString(),
        requestId: request.id,
        data,
      })),
    );
  }
}
