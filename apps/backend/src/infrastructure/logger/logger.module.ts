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
          const existingRequestId = req.headers['x-request-id'];

          if (
            typeof existingRequestId === 'string' &&
            existingRequestId.length > 0
          ) {
            return existingRequestId;
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

        serializers: {
          req(req) {
            return {
              id: req.id,
              method: req.method,
              url: req.url,
              ip: req.ip,
              userAgent: req.headers['user-agent'],
            };
          },

          res(res) {
            return {
              statusCode: res.statusCode,
            };
          },

          err(err) {
            return {
              type: err.name,
              message: err.message,
              stack: err.stack,
            };
          },
        },

        customSuccessMessage(req, res) {
          return `${req.method} ${req.url} completed with ${res.statusCode}`;
        },

        customErrorMessage(req, res, error) {
          return `${req.method} ${req.url} failed: ${error.message}`;
        },
      },
    }),
  ],
  exports: [LoggerModule],
})
export class AppLoggerModule {}