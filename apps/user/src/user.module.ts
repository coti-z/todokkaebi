import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtTokenModule } from '@libs/jwt';
import { UserPresentationModule } from '@user/presentation/user.presentation.module';
import { UserApplicationModule } from '@user/application/user.application.module';
import { UserInfrastructureModule } from '@user/infrastructure/user.infrastructure.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    JwtTokenModule,
    CqrsModule,

    UserPresentationModule,
    UserApplicationModule,
    UserInfrastructureModule,
  ],
  providers: [],
})
export class UserModule {}
