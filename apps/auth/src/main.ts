import { NestFactory } from '@nestjs/core';
import { AuthModule } from '@auth/auth.module';


@Injectable()
async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  await app.listen(5000);
}
bootstrap();
