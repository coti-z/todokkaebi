import { Module } from '@nestjs/common';
import { UserResolver } from '@user/presentation/resolver/user.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from '@auth/auth.module';
import { JwtTokenModule } from '@libs/jwt';

@Module({
  imports: [CqrsModule, JwtTokenModule, AuthModule],
  providers: [UserResolver],
  exports: [UserResolver],
})
export class UserPresentationModule {}
