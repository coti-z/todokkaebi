/**
 * TODO
 * @task implement to auth controller to receive gRPC request
 */

import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthMicroservice } from '@libs/grpc';

@Controller()
export class AuthGrpcController {
  @GrpcMethod(AuthMicroservice.AUTH_SERVICE_NAME, 'CreateUserCredential')
  async createCredential(data: {
    userId: string;
    email: string;
    passwordHash: string;
    createdAt: string;
    updatedAt: string;
  }) {
    console.log(data);
    return true;
  }
}
