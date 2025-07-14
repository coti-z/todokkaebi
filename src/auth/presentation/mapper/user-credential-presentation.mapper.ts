import { DeleteUserCredentialCommand } from '@auth/application/port/in/commands/delete-user-credential.command';
import { StoreUserCredentialCommand } from '@auth/application/port/in/commands/store-user-credential.command';
import { UpdateUserCredentialCommand } from '@auth/application/port/in/commands/update-user-credential.command';
import {
  DeleteUserCredentialRequest,
  StoreUserCredentialRequest,
  UpdateUserCredentialRequest,
} from '@libs/grpc';

export class UserCredentialPresentationMapper {
  static toStoreUserCredentialCommand(
    request: StoreUserCredentialRequest,
  ): StoreUserCredentialCommand {
    return {
      userId: request.userId,
      email: request.email,
      passwordHash: request.passwordHash,
    };
  }

  static toUpdateUserCredentialCommand(
    request: UpdateUserCredentialRequest,
  ): UpdateUserCredentialCommand {
    return {
      userId: request.userId,
      email: request.email,
      passwordHash: request.passwordHash,
    };
  }

  static toDeleteUserCredentialCommand(
    request: DeleteUserCredentialRequest,
  ): DeleteUserCredentialCommand {
    return {
      userId: request.userId,
    };
  }
}
