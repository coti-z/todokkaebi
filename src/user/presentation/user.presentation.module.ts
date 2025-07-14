import { Module } from '@nestjs/common';
import { UserResolver } from '@user/presentation/resolver/user.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import { UserInfrastructureModule } from '@user/infrastructure/user.infrastructure.module';
import { JwtTokenModule } from '@libs/jwt';

@Module({
  imports: [CqrsModule, UserInfrastructureModule, JwtTokenModule],
  providers: [UserResolver],
  exports: [UserResolver],
})
export class UserPresentationModule {}
