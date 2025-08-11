import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ProjectPresentationModule } from './presentation/project.presentation.module';
import { APP_FILTER } from '@nestjs/core';
import { LoggerModule } from '@libs/logger';
import { ProjectApplicationModule } from '@project/application/project.application.module';
import { JwtTokenModule } from '@libs/jwt';

@Module({
  imports: [
    JwtTokenModule,
    ProjectPresentationModule,
    ProjectApplicationModule,
    LoggerModule,
  ],
})
export class ProjectModule {}
