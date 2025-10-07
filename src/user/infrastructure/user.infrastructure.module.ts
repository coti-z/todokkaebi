import { Module } from '@nestjs/common';
import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';

import { DatabaseModule } from '@libs/database';
import { AuthMicroservice } from '@libs/grpc';

import { PASSWORD_HASHER_OUTBOUND_PORT } from '@auth/application/port/out/password-hasher.port';

import { UserRepositorySymbol } from '@user/application/port/out/user-repository.port';
import {
  USER_GRPC_CLIENT_SYMBOL,
  USER_GRPC_SERVICE_SYMBOL,
} from '@user/infrastructure/adapter/grpc/options/user-grpc-client.options';
import { BcryptPasswordHasherAdapter } from '@user/infrastructure/adapter/password-hasher.adapter';
import { UserRepositoryImpl } from '@user/infrastructure/persistence/database/user.repository';

@Module({
  imports: [
    DatabaseModule,
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
  providers: [
    {
      provide: PASSWORD_HASHER_OUTBOUND_PORT,
      useClass: BcryptPasswordHasherAdapter,
    },
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
