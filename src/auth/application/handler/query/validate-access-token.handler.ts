import { ValidateAccessTokenQuery } from '@auth/application/port/in/query/validate-access-token.query';
import { TokenService } from '@auth/application/service/token.service';
import { ErrorHandlingStrategy } from '@libs/exception';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(ValidateAccessTokenQuery)
export class ValidateAccessTokenHandler implements IQueryHandler {
  constructor(private readonly tokenService: TokenService) {}

  async execute(query: ValidateAccessTokenQuery): Promise<void> {
    try {
      await this.tokenService.validateAccessTokenNotRevoke(query.accessToken);
    } catch (error) {
      ErrorHandlingStrategy.handleError(error);
    }
  }
}
