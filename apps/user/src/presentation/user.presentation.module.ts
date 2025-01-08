import { Module } from '@nestjs/common';
import { UserResolver } from '@user/presentation/resolver/user.resolver';

@Module({
  imports: [],
  providers: [UserResolver],
  exports: [UserResolver],
})
export class UserPresentationModule {}
