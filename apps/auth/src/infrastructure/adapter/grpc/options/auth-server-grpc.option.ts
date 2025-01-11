import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const authGrpcServerOptions: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'auth',
    protoPath: join(
      __dirname,
      '../../../../../../../../../../proto/auth.proto',
    ),

    url: 'auth:50051',
  },
};
