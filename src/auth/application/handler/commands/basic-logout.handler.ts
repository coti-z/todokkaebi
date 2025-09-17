import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { BasicLogoutCommand } from '@auth/application/port/in/commands/basic-logout.command';
import { ErrorHandlingStrategy } from '@libs/exception';
import { TokenService } from '@auth/application/service/token.service';
import { Token } from '@auth/domain/entity/token.entity';
import {
  ITransactionManager,
  Transactional,
  TransactionManagerSymbol,
} from '@libs/database';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
@CommandHandler(BasicLogoutCommand)
export class BasicLogoutHandler implements ICommandHandler {
  constructor(
    private readonly tokenService: TokenService,
    private readonly errorHandlingStrategy: ErrorHandlingStrategy,
    @Inject(TransactionManagerSymbol)
    private readonly transactionManager: ITransactionManager,
  ) {}

  @Transactional()
  async execute(command: BasicLogoutCommand): Promise<Token> {
    try {
      return await this.tokenService.revokeTokenByAccessToken({
        accessToken: command.accessToken,
      });
    } catch (error) {
      this.errorHandlingStrategy.handleError(error, command.context);
    }
  }
}
