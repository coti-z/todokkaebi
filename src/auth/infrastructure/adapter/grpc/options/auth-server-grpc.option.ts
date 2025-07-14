import { AUTH_PACKAGE_NAME } from '@libs/grpc/proto';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const authGrpcServerOptions: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    package: AUTH_PACKAGE_NAME,
    protoPath: join(
      __dirname,
      '../../../../../../../../../../proto/auth.proto',
    ),
    url: 'auth:50051',
  },
};
