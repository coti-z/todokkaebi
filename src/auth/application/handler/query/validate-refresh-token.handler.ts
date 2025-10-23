import { Inject, Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import {
  ITransactionManager,
  Transactional,
  TransactionManagerSymbol,
} from '@libs/database';
import { ErrorHandlingStrategy } from '@libs/exception';

import { ValidateRefreshTokenQuery } from '@auth/application/port/in/query/validate-refresh-token.query';
import { TokenService } from '@auth/application/service/token.service';

@Injectable()
@QueryHandler(ValidateRefreshTokenQuery)
export class ValidateRefreshTokenHandler implements IQueryHandler {
  constructor(
    private readonly tokenService: TokenService,
    private readonly errorHandlingStrategy: ErrorHandlingStrategy,

    @Inject(TransactionManagerSymbol)
    private readonly transactionManager: ITransactionManager,
  ) {}

  @Transactional()
  async execute(query: ValidateRefreshTokenQuery): Promise<void> {
    try {
      await this.tokenService.validateRefreshTokenNotRevoke(query.refreshToken);
    } catch (error) {
      this.errorHandlingStrategy.handleError(error, query.context);
    }
  }
}
