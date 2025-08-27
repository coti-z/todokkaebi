import { ValidateRefreshTokenQuery } from '@auth/application/port/in/query/validate-refresh-token.query';
import { TokenService } from '@auth/application/service/token.service';
import { ErrorHandlingStrategy } from '@libs/exception';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(ValidateRefreshTokenQuery)
export class ValidateRefreshTokenHandler implements IQueryHandler {
  constructor(private readonly tokenService: TokenService) {}

  async execute(query: ValidateRefreshTokenQuery): Promise<any> {
    try {
      await this.tokenService.isRevokeRefreshToken(query.refreshToken);
    } catch (error) {
      ErrorHandlingStrategy.handleError(error);
    }
  }
}
