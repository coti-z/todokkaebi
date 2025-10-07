import { IQuery } from '@nestjs/cqrs';

import { RequestContext } from '@libs/exception';

export class ValidateAccessTokenQuery implements IQuery {
  constructor(
    public readonly accessToken: string,
    public readonly context: RequestContext,
  ) {}
}
