import { Module } from '@nestjs/common';
import { JwtTokenModule } from '@libs/jwt';
import { AuthPresentationModule } from '@auth/presentation/auth.presentaion.module';
import { AuthApplicationModule } from '@auth/application/auth.application.module';
import { AuthInfrastructureModule } from '@auth/infrastructure/auth.infrastructure.module';

/**
 * TODO
 * @task implement importing the module written so far
 */
@Module({
  imports: [
    JwtTokenModule,
    AuthPresentationModule,
    AuthApplicationModule,
    AuthInfrastructureModule,
  ],
  providers: [],
  exports: [AuthApplicationModule],
})
export class AuthModule {}
