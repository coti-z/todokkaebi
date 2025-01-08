import { NestFactory } from '@nestjs/core';
import { AuthModule } from '@auth/auth.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { authGrpcOptions } from '@auth/infrastructure/adapter/grpc/options/auth-grpc.option';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  app.connectMicroservice<MicroserviceOptions>(authGrpcOptions);

  await app.startAllMicroservices();
  await app.listen(3001);
}

bootstrap();
