import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { BasicLoginCommand } from '@auth/application/port/in/commands/basic-login.command';
import { UserCredentialService } from '@auth/application/service/user-credential.service';
import { ErrorHandlingStrategy } from '@libs/exception';
import { TokenService } from '@auth/application/service/token.service';
import { Token } from '@auth/domain/entity/token.entity';
import { TokenByJWTService } from '@auth/application/service/token-by-jwt.service';
import {
  ITransactionManager,
  Transactional,
  TransactionManagerSymbol,
} from '@libs/database';
import { Inject, Injectable } from '@nestjs/common';
import { Lock, RateLimit } from '@libs/decorators';
@Injectable()
@CommandHandler(BasicLoginCommand)
export class BasicLoginHandler implements ICommandHandler {
  constructor(
    private readonly userAuthService: UserCredentialService,
    private readonly tokenService: TokenService,
    private readonly tokenByJwtService: TokenByJWTService,
    private readonly errorHandlingStrategy: ErrorHandlingStrategy,

    @Inject(TransactionManagerSymbol)
    private readonly transactionManager: ITransactionManager,
  ) {}

  @Lock({
    key: args => `login-user:${args[0].email}`,
    ttl: 5000,
    timeout: 3000,
  })
  @Transactional()
  async execute(command: BasicLoginCommand): Promise<Token> {
    try {
      const credential = await this.userAuthService.validatePassword({
        email: command.email,
        password: command.password,
      });

      const pairToken = await this.tokenByJwtService.generatePairToken({
        userId: credential.userId,
      });
      return this.tokenService.storeToken({
        accessToken: pairToken.accessToken,
        refreshToken: pairToken.refreshToken,
        refreshTokenExpiresAt: pairToken.refreshTokenExpires,
        userId: credential.userId,
      });
    } catch (error) {
      this.errorHandlingStrategy.handleError(error, command.context);
    }
  }
}
