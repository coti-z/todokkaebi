import { Module } from '@nestjs/common';

import { AuthApplicationModule } from '@auth/application/auth.application.module';
import { AuthInfrastructureModule } from '@auth/infrastructure/auth.infrastructure.module';
import { AuthPresentationModule } from '@auth/presentation/auth.presentaion.module';

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
