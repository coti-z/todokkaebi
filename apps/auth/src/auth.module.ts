import { Module } from '@nestjs/common';
import { AuthInfrastructureModule } from '@auth/infrastructure/auth.infrastructure.module';
import { AuthPresentaionModule } from '@auth/presentation/auth.presentaion.module';
import { JwtTokenModule } from '@libs/jwt';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthApplicationModule } from '@auth/application/auth.application.module';

/**
 * TODO
 * @task implement importing the module written so far
 */
@Module({
  imports: [
    JwtTokenModule,
    CqrsModule,
    AuthPresentaionModule,
    AuthApplicationModule,
    AuthInfrastructureModule,
  ],
  providers: [],
})
export class AuthModule {}
