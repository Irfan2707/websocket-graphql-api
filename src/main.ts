import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import * as express from 'express';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(express.json());

  app.use(new AuthMiddleware().use); 

  await app.listen(3000);
}

bootstrap();
