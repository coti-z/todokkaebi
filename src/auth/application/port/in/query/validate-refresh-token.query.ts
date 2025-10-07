import { IQuery } from '@nestjs/cqrs';

import { RequestContext } from '@libs/exception';

export class ValidateRefreshTokenQuery implements IQuery {
  constructor(
    public readonly refreshToken: string,
    public readonly context: RequestContext,
  ) {}
}
