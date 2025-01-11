import { NestFactory } from '@nestjs/core';
import { AuthModule } from '@auth/auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  await app.startAllMicroservices();
  await app.listen(3001);
}

bootstrap();
