/**
 * TODO
 * @task implement to auth controller to receive gRPC request
 */

import { Controller } from '@nestjs/common';
import {
  AuthServiceController,
  AuthServiceControllerMethods,
  CreateUserCredentialRequest,
  CreateUserResponse,
  UpdateUserCredentialRequest,
} from '@libs/grpc';

@Controller()
@AuthServiceControllerMethods()
export class AuthGrpcController implements AuthServiceController {
  async createUserCredential(
    request: CreateUserCredentialRequest,
  ): Promise<CreateUserResponse> {
    return {
      success: true,
    };
  }

  async updateUserCredential(
    request: UpdateUserCredentialRequest,
  ): Promise<UpdateUserCredentialRequest> {
    console.log('Received updateUserCredential request:', request);
    return request;
  }
}
