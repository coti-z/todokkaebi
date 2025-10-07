import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';

import { GraphQLExceptionFilter } from '@libs/filter';
import { LoggerModule } from '@libs/logger';

import { AuthModule } from '@auth/auth.module';

import { UserModule } from '@user/user.module';

import { ProjectModule } from '@project/project.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      buildSchemaOptions: {
        orphanedTypes: [],
      },
    }),
    LoggerModule,
    AuthModule,
    UserModule,
    ProjectModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GraphQLExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },
  ],
})
export class AppModule {}
