import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './infrastructure/config/configuration';
import { validationSchema } from './infrastructure/config/env.validation';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { AppLoggerModule } from './infrastructure/logger/logger.module';
import { HealthModule } from './modules/health/health.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core/constants';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      load: configuration,
      validationSchema,
    }),
    PrismaModule,
    AppLoggerModule,
    HealthModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
