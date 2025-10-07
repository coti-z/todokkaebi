import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  ITransactionManager,
  Transactional,
  TransactionManagerSymbol,
} from '@libs/database';
import { Lock } from '@libs/decorators';
import { ErrorHandlingStrategy } from '@libs/exception';

import { ReissueTokenCommand } from '@auth/application/port/in/commands/reissue-token.command';
import { TokenByJWTService } from '@auth/application/service/token-by-jwt.service';
import { TokenService } from '@auth/application/service/token.service';
import { Token } from '@auth/domain/entity/token.entity';

@Injectable()
@CommandHandler(ReissueTokenCommand)
export class ReissueTokenHandler implements ICommandHandler {
  constructor(
    private readonly tokenService: TokenService,
    private readonly tokenByJWTService: TokenByJWTService,
    private readonly errorHandlingStrategy: ErrorHandlingStrategy,

    @Inject(TransactionManagerSymbol)
    private readonly transactionManager: ITransactionManager,
  ) {}

  @Lock({
    key: args => `token-reissue:${args[0].refreshToken}`,
    ttl: 5000,
  })
  @Transactional()
  async execute(command: ReissueTokenCommand): Promise<Token> {
    try {
      const oldToken = await this.tokenService.revokeTokenByRefreshToken({
        refreshToken: command.refreshToken,
      });

      const pairToken = await this.tokenByJWTService.generatePairToken({
        userId: oldToken.userId,
      });

      return await this.tokenService.storeToken({
        accessToken: pairToken.accessToken,
        refreshToken: pairToken.refreshToken,
        refreshTokenExpiresAt: pairToken.refreshTokenExpires,
        userId: oldToken.userId,
      });
    } catch (error) {
      this.errorHandlingStrategy.handleError(error, command.context);
    }
  }
}
