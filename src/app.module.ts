import { GraphQLExceptionFilter } from '@/utils/filters/exception.filter';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_FILTER',
      useClass: GraphQLExceptionFilter,
    },
  ],
})
export class AppModule {}
