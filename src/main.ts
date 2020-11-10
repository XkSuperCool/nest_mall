import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

import { cookieSecret, sessionSecret } from './config/secretkey';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 静态目录
  app.useStaticAssets(path.join(__dirname, '..', 'assets'));

  app.use(cookieParser(cookieSecret));

  app.use(session({
    secret: sessionSecret,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 5, // 5h
      httpOnly: true
    },
    rolling: true
  }));

  await app.listen(3000);
}
bootstrap();
