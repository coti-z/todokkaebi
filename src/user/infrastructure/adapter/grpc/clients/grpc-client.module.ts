import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { USER_GRPC_CLIENT_SYMBOL } from '@user/infrastructure/adapter/grpc/options/user-grpc-client.options';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_GRPC_CLIENT_SYMBOL,
        transport: Transport.GRPC,
        options: {
          package: 'auth',
          protoPath: './proto/auth.proto',
          url: 'auth:50051',
        },
      },
    ]),
  ],
})
export class UserGrpcClientModule {}
