import { RequestContext } from '@libs/exception';
import { IQuery } from '@nestjs/cqrs';

export class ValidateRefreshTokenQuery implements IQuery {
  constructor(
    public readonly refreshToken: string,
    public readonly context: RequestContext,
  ) {}
}
