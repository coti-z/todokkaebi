import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtTokenModule } from '@libs/jwt';
import { UserPresentationModule } from '@user/presentation/user.presentation.module';
import { UserApplicationModule } from '@user/application/user.application.module';
import { UserInfrastructureModule } from '@user/infrastructure/user.infrastructure.module';

@Module({
  imports: [JwtTokenModule, CqrsModule],
  providers: [
    UserPresentationModule,
    UserApplicationModule,
    UserInfrastructureModule,
  ],
})
export class UserModule {}
