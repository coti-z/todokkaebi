import { GraphQLExceptionFilter } from '@libs/filter';
import { JwtTokenModule } from '@libs/jwt';
import { LoggerModule } from '@libs/logger';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { UserApplicationModule } from '@user/application/user.application.module';
import { UserPresentationModule } from '@user/presentation/user.presentation.module';

@Module({
  imports: [
    JwtTokenModule,
    CqrsModule,
    UserPresentationModule,
    UserApplicationModule,
  ],
})
export class UserModule {}
