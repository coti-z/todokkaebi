import { AuthModule } from '@auth/auth.module';
import { authGrpcServerOptions } from '@auth/infrastructure/adapter/grpc/options/auth-server-grpc.option';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.connectMicroservice<MicroserviceOptions>(authGrpcServerOptions);
  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();
