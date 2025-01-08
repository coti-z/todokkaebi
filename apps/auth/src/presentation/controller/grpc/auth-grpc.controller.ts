/**
 * TODO
 * @task implement to auth controller to receive gRPC request
 */

import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {AuthMicroservice} from '@libs/grpc'

@Controller()
export class AuthGrpcController {
  @GrpcMethod(AuthMicroservice.AUTH_SERVICE_NAME, AuthMicroservice.)
}
