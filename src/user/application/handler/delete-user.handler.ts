import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  ITransactionManager,
  Transactional,
  TransactionManagerSymbol,
} from '@libs/database';
import { ErrorHandlingStrategy } from '@libs/exception';

import { DeleteUserParam } from '@user/application/dto/param/delete-user.param';
import { DeleteUserCommand } from '@user/application/port/in/delete-user.command';
import {
  EVENT_PUBLISHER_OUTBOUND_PORT,
  IEventPublisher,
} from '@user/application/port/out/i-redis-event.port';
import { UserService } from '@user/application/services/user.service';

@Injectable()
@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    private readonly userService: UserService,

    private readonly errorHandlingStrategy: ErrorHandlingStrategy,

    @Inject(TransactionManagerSymbol)
    private readonly transactionManager: ITransactionManager,

    @Inject(EVENT_PUBLISHER_OUTBOUND_PORT)
    private readonly eventPublisher: IEventPublisher,
  ) {}

  @Transactional()
  async execute(command: DeleteUserCommand): Promise<void> {
    try {
      const user = await this.userService.deleteUser(
        new DeleteUserParam(command.id),
      );

      const events = user.getDomainEvents();
      events.forEach(event => {
        event.correlationId = command.context.correlationId;
      });

      if (events.length > 0) {
        this.eventPublisher.publicEvents(events);
      }
    } catch (error) {
      throw error;
    }
  }
}
