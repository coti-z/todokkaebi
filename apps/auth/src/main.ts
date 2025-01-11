import { AuthModule } from '@auth/auth.module';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { authGrpcServerOptions } from '@auth/infrastructure/adapter/grpc/options/auth-grpc.option';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.connectMicroservice<MicroserviceOptions>(authGrpcServerOptions);
  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();
