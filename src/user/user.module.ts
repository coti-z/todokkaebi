import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UserApplicationModule } from '@user/application/user.application.module';
import { UserPresentationModule } from '@user/presentation/user.presentation.module';

@Module({
  imports: [CqrsModule, UserPresentationModule, UserApplicationModule],
})
export class UserModule {}
