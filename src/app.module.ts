import { Module } from '@nestjs/common';
import { LoggerModule } from '@libs/logger';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@src/auth/auth.module';
import { TodoModule } from '@src/todo/todo.module';
import { UserModule } from '@src/user/user.module';
import { SlackNotificationService } from '@libs/slack';
import { GraphQLExceptionFilter } from '@libs/filter';
import { LoggingInterceptor } from '@libs/interceptor';

@Module({
  imports: [
    LoggerModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env',
      isGlobal: true,
    }),
    AuthModule,
    TodoModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    SlackNotificationService,
    {
      provide: 'APP_FILTER',
      useClass: GraphQLExceptionFilter,
    },
    {
      provide: 'APP_INTERCEPTOR',
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
