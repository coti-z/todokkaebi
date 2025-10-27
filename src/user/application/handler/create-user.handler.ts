import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  ITransactionManager,
  Transactional,
  TransactionManagerSymbol,
} from '@libs/database';
import { ErrorHandlingStrategy } from '@libs/exception';

import { CreateUserParam } from '@user/application/dto/param/create-user.param';
import { CreateUserCommand } from '@user/application/port/in/create-user.command';
import {
  AUTH_CLIENT_OUTBOUND_PORT,
  IAuthClientPort,
} from '@user/application/port/out/i-auth-client.port';
import {
  EVENT_PUBLISHER_OUTBOUND_PORT,
  IEventPublisher,
} from '@user/application/port/out/i-redis-event.port';
import { UserService } from '@user/application/services/user.service';
import { User } from '@user/domain/entity/user.entity';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userService: UserService,
    private readonly errorHandlingStrategy: ErrorHandlingStrategy,

    @Inject(AUTH_CLIENT_OUTBOUND_PORT)
    private readonly authClient: IAuthClientPort,

    @Inject(EVENT_PUBLISHER_OUTBOUND_PORT)
    private readonly eventPublisher: IEventPublisher,

    @Inject(TransactionManagerSymbol)
    private readonly transactionManager: ITransactionManager,
  ) {}

  @Transactional()
  async execute(command: CreateUserCommand): Promise<User> {
    try {
      const user = await this.userService.createUser(
        new CreateUserParam(
          command.email,
          command.nickname,
          command.password,
          command.birthday,
        ),
      );

      const events = user.getDomainEvents();
      events.forEach(event => {
        event.correlationId = command.context.correlationId;
      });

      if (events.length > 0) {
        this.eventPublisher.publicEvents(events);
        user.cleanDomainEvents();
      }

      return user;
    } catch (error) {
      this.errorHandlingStrategy.handleError(error, command.context);
    }
  }
}
