import { Module } from '@nestjs/common';
import { DatabaseModule } from '@libs/database';
import { UserRepositorySymbol } from '@user/application/port/out/user-repository.port';
import { UserRepositoryImpl } from '@user/infrastructure/persistence/repository/user.repository';
import {
  USER_GRPC_CLIENT_SYMBOL,
  USER_GRPC_SERVICE_SYMBOL,
} from '@user/infrastructure/adapter/grpc/options/user-grpc-client.options';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthMicroservice } from '@libs/grpc';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: UserRepositorySymbol,
      useClass: UserRepositoryImpl,
    },
    {
      provide: USER_GRPC_SERVICE_SYMBOL,
      useFactory: (client: ClientGrpc) => {
        return client.getService<AuthMicroservice.AuthServiceClient>(
          AuthMicroservice.AUTH_SERVICE_NAME,
        );
      },
      inject: [USER_GRPC_CLIENT_SYMBOL],
    },
  ],
  exports: [UserRepositorySymbol, USER_GRPC_SERVICE_SYMBOL],
})
export class UserInfrastructureModule {}
