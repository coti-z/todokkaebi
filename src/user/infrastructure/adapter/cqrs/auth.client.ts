import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { DeleteUserCredentialCommand } from '@auth/application/port/in/commands/delete-user-credential.command';
import { StoreUserCredentialCommand } from '@auth/application/port/in/commands/store-user-credential.command';
import { UpdateUserCredentialCommand } from '@auth/application/port/in/commands/update-user-credential.command';

import { DeleteUserCredentialParams } from '@user/application/port/out/dto/delete-user-credential.params';
import { StoreUserCredentialParams } from '@user/application/port/out/dto/store-user-credential.params';
import { UpdateUserCredentialParams } from '@user/application/port/out/dto/update-user-credential.params';
import { IAuthClientPort } from '@user/application/port/out/i-auth-client.port';

@Injectable()
export class AuthClientAdapter implements IAuthClientPort {
  constructor(private readonly commandBus: CommandBus) {}
  async updateUserCredential(
    params: UpdateUserCredentialParams,
  ): Promise<void> {
    const command = new UpdateUserCredentialCommand(
      params.userId,
      params.context,
      params.email,
      params.passwordHash,
    );

    await this.commandBus.execute(command);
  }
  async deleteUserCredential(
    params: DeleteUserCredentialParams,
  ): Promise<void> {
    const command = new DeleteUserCredentialCommand(
      params.userId,
      params.context,
    );

    await this.commandBus.execute(command);
  }
  async storeUserCredential(params: StoreUserCredentialParams): Promise<void> {
    const command = new StoreUserCredentialCommand(
      params.userId,
      params.email,
      params.passwordHash,
      params.context,
    );

    await this.commandBus.execute(command);
  }
}
