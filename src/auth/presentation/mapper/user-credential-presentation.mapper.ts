import { DeleteUserCredentialCommand } from '@auth/application/port/in/commands/delete-user-credential.command';
import { StoreUserCredentialCommand } from '@auth/application/port/in/commands/store-user-credential.command';
import { UpdateUserCredentialCommand } from '@auth/application/port/in/commands/update-user-credential.command';
import { RequestContext } from '@libs/exception';
import {
  DeleteUserCredentialRequest,
  StoreUserCredentialRequest,
  UpdateUserCredentialRequest,
} from '@libs/grpc';

export class UserCredentialPresentationMapper {
  static toStoreUserCredentialCommand(
    request: StoreUserCredentialRequest,
    context: RequestContext,
  ): StoreUserCredentialCommand {
    return new StoreUserCredentialCommand(
      request.userId,
      request.email,
      request.passwordHash,
      context,
    );
  }

  static toUpdateUserCredentialCommand(
    request: UpdateUserCredentialRequest,
    context: RequestContext,
  ): UpdateUserCredentialCommand {
    return new UpdateUserCredentialCommand(
      request.userId,
      context,
      request.email,
      request.passwordHash,
    );
  }

  static toDeleteUserCredentialCommand(
    request: DeleteUserCredentialRequest,
    context: RequestContext,
  ): DeleteUserCredentialCommand {
    return new DeleteUserCredentialCommand(request.userId, context);
  }
}
