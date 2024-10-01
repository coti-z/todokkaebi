import { AppModule } from '@/app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./localhost-key.pem'),
    cert: fs.readFileSync('./localhost.pem'),
  };
  //const httpsOptions = {
  // key: fs.readFileSync('/home/ubuntu/certs/privkey.pem'),
  // cert: fs.readFileSync('/home/ubuntu/certs/fullchain.pem'),
  //};
  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://todokkaebi.netlify.app',
      'https://cogcod.github.io/',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(443);
}
bootstrap();
