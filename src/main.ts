import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from 'src/app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const microserviceOptions: MicroserviceOptions = {
    transport: Transport.REDIS,
    options: {
      host: configService.get<string>('REDIS_HOST', 'redis'),
      port: configService.get<number>('REDIS_PORT', 6379),
    },
  };

  app.connectMicroservice(microserviceOptions);
  await app.startAllMicroservices();

  await app.listen(3000);
}

bootstrap().catch(error => {
  console.error('Application failed to start', error);
  process.exit(1);
});
