import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UserCredentialPresentationMapper } from '@auth/presentation/mapper/user-credential-presentation.mapper';
import {
  AuthServiceController,
  AuthServiceControllerMethods,
  DeleteUserCredentialRequest,
  DeleteUserCredentialResponse,
  StoreUserCredentialRequest,
  StoreUserCredentialResponse,
  UpdateUserCredentialRequest,
  UpdateUserCredentialResponse,
} from '@libs/grpc';

@Controller()
@AuthServiceControllerMethods()
export class AuthGrpcController implements AuthServiceController {
  constructor(private readonly commandBus: CommandBus) {}
  async storeUserCredential(
    request: StoreUserCredentialRequest,
  ): Promise<StoreUserCredentialResponse> {
    const command =
      UserCredentialPresentationMapper.toStoreUserCredentialCommand(request);
    await this.commandBus.execute(command);
    return {
      success: true,
    };
  }

  async updateUserCredential(
    request: UpdateUserCredentialRequest,
  ): Promise<UpdateUserCredentialResponse> {
    const command =
      UserCredentialPresentationMapper.toUpdateUserCredentialCommand(request);
    await this.commandBus.execute(command);
    return {
      success: true,
    };
  }

  async deleteUserCredential(
    request: DeleteUserCredentialRequest,
  ): Promise<DeleteUserCredentialResponse> {
    const command =
      UserCredentialPresentationMapper.toDeleteUserCredentialCommand(request);
    await this.commandBus.execute(command);
    return {
      success: true,
    };
  }
}
