import { DeleteUserCredentialParams } from '@user/application/port/out/dto/delete-user-credential.params';
import { StoreUserCredentialParams } from '@user/application/port/out/dto/store-user-credential.params';
import { UpdateUserCredentialParams } from '@user/application/port/out/dto/update-user-credential.params';

export const AUTH_CLIENT_OUTBOUND_PORT = 'AUTH_CLIENT_OUTBOUND_PORT';

export interface IAuthClientPort {
  storeUserCredential(params: StoreUserCredentialParams): Promise<void>;
  deleteUserCredential(params: DeleteUserCredentialParams): Promise<void>;

  updateUserCredential(params: UpdateUserCredentialParams): Promise<void>;
}
