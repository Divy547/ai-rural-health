import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';
import { setupSwagger } from './infrastructure/swagger/swagger.setup';

import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });


  app.useLogger(app.get(Logger));

  const configService = app.get(ConfigService);

  app.use(helmet());

  app.use(compression());

  app.use(cookieParser());

  app.enableCors({
    origin: configService.get<string>('app.corsOrigin'),
    credentials: true,
  });

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );


  setupSwagger(app, configService);

  const port = configService.get<number>('app.port') ?? 3000;

  await app.listen(port);

  const logger = app.get(Logger);

  logger.log(
    `Server running on http://localhost:${port}/api/v1`,
  );

  logger.log(
    `Swagger available at http://localhost:${port}/api/docs`,
  );
}

void bootstrap();