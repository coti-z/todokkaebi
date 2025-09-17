import { RequestContext } from '@libs/exception';
import { IQuery } from '@nestjs/cqrs';

export class ValidateAccessTokenQuery implements IQuery {
  constructor(
    public readonly accessToken: string,
    public readonly context: RequestContext,
  ) {}
}
