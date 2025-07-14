import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ProjectPresentationModule } from './presentation/project.presentation.module';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLExceptionFilter } from '@libs/filter/exception.filter';
import { LoggerModule } from '@libs/logger/logger.module';

@Module({
  imports: [
   
    ProjectPresentationModule,
    LoggerModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GraphQLExceptionFilter,
    },
  ],
})
export class ProjectModule {}
