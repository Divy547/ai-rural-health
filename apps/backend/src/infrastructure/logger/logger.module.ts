import { randomUUID } from 'node:crypto';

import { Global, Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

@Global()
@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.LOG_LEVEL ?? 'info',

        autoLogging: true,

        genReqId(req) {
          const requestId = req.headers['x-request-id'];

          if (typeof requestId === 'string' && requestId.length > 0) {
            return requestId;
          }

          return randomUUID();
        },

        customProps(req) {
          return {
            requestId: req.id,
          };
        },

        transport:
          process.env.NODE_ENV === 'development'
            ? {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  singleLine: true,
                  translateTime: 'SYS:standard',
                  ignore: 'pid,hostname',
                },
              }
            : undefined,

        redact: {
          paths: [
            'req.headers.authorization',
            'req.headers.cookie',
            'req.body.password',
            'req.body.accessToken',
            'req.body.refreshToken',
          ],
          censor: '[REDACTED]',
        },
      },
    }),
  ],
  exports: [LoggerModule],
})
export class AppLoggerModule {}
