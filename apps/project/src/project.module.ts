import { Module } from '@nestjs/common';
import { ProjectPresentationModule } from './presentation/project.presentation.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'apps/project/schema.graphql'),
      playground: true,
    }),
    ProjectPresentationModule,
  ],
})
export class ProjectModule {}
