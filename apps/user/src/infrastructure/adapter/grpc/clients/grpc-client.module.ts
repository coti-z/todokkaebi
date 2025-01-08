import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import {
  USER_GRPC_CLIENT_SYMBOL,
  userGrpcClientOptions,
} from '@user/infrastructure/adapter/grpc/options/user-grpc-client.options';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_GRPC_CLIENT_SYMBOL,
        ...userGrpcClientOptions,
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class UserGrpcClientModule {}
