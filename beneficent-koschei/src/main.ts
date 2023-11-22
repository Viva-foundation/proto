import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as compression from 'compression';
import { json, urlencoded } from 'express';
import { type Env } from './env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<Env>);
  app.setGlobalPrefix(configService.get('APP_PREFIX') || '/');
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.enableCors();
  app.use(compression());
  app.use(json({ limit: '200mb' }));
  app.use(urlencoded({ limit: '200mb', extended: true }));
  await app.listen(configService.get('APP_PORT'));
}

bootstrap();
