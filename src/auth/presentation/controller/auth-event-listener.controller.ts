import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EventPattern, Payload } from '@nestjs/microservices';

import { RequestContextExtractor } from '@libs/exception';

import { DeleteUserCredentialCommand } from '@auth/application/port/in/commands/delete-user-credential.command';
import { StoreUserCredentialCommand } from '@auth/application/port/in/commands/store-user-credential.command';
import { UpdateUserCredentialCommand } from '@auth/application/port/in/commands/update-user-credential.command';

import { CreateUserEvent } from '@user/domain/event/create-user.event';
import { DeleteUserEvent } from '@user/domain/event/delete-user.event';
import { UpdateUserEvent } from '@user/domain/event/update-user.event';
/**
 *
 *
 * @export
 * @class AuthEventListenerController
 */
@Controller()
export class AuthEventListenerController {
  constructor(private readonly commandBus: CommandBus) {}

  /**
   * User Domain의 'user.created' Event를 수신하고 인증 정보를 저장합니다.
   *
   * @param event - User Domain에서 발행된 CreateUserEvent (correlationId 포함)
   *
   */
  @EventPattern('user.created')
  async handlerUserCreated(@Payload() event: CreateUserEvent): Promise<void> {
    const requestContext = RequestContextExtractor.fromEventContext(
      event.correlationId,
    );
    const command = new StoreUserCredentialCommand(
      event.userId,
      event.email,
      event.password,
      requestContext,
    );

    await this.commandBus.execute(command);
  }

  /**'
   * User Domain 의 'user.deleted' Event를 수신하고 인증 정보를 삭제합니다.
   *
   */
  @EventPattern('user.deleted')
  async handlerUserDeleted(@Payload() event: DeleteUserEvent): Promise<void> {
    const requestContext = RequestContextExtractor.fromEventContext(
      event.correlationId,
    );
    const command = new DeleteUserCredentialCommand(
      event.userId,
      requestContext,
    );

    await this.commandBus.execute(command);
  }

  @EventPattern('user.deleted')
  async handlerUserUpdated(@Payload() event: UpdateUserEvent): Promise<void> {
    const requestContext = RequestContextExtractor.fromEventContext(
      event.correlationId,
    );

    const command = new UpdateUserCredentialCommand(
      event.userId,
      requestContext,
      event.email,
      event.password,
    );
    await this.commandBus.execute(command);
  }
}
