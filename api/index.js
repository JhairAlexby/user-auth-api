import { NestFactory } from '@nestjs/core';
import { AppModule } from '../dist/app.module';

export default async function (req, res) {
  const app = await NestFactory.create(AppModule);
  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp(req, res);
}