import { Module } from '@nestjs/common';
import { ProjectApplicationModule } from './application/project.application.module';
import { ProjectPresentationModule } from './presentation/project.presentation.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    ProjectApplicationModule,
    ProjectPresentationModule,
  ],
  providers: [ ],
})
export class ProjectModule {}
