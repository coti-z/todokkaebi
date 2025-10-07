import { IQuery } from '@nestjs/cqrs';

import { RequestContext } from '@libs/exception';

export class ProjectsByUserIdQuery implements IQuery {
  constructor(
    public readonly userId: string,
    public readonly context: RequestContext,
  ) {}
}
