import { Module } from '@nestjs/common';
import { AuthPresentationModule } from '@auth/presentation/auth.presentaion.module';
import { AuthApplicationModule } from '@auth/application/auth.application.module';
import { AuthInfrastructureModule } from '@auth/infrastructure/auth.infrastructure.module';

@Module({
  imports: [
    AuthPresentationModule,
    AuthApplicationModule,
    AuthInfrastructureModule,
  ],
  providers: [],
  exports: [AuthInfrastructureModule],
})
export class AuthModule {}
