import { NestFactory } from '@nestjs/core';

import { AppModule } from 'src/app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap().catch(error => {
  console.error('Application failed to start', error);
  process.exit(1);
});
