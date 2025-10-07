import { IQuery } from '@nestjs/cqrs';

import { RequestContext } from '@libs/exception';

export class ProjectByIdQuery implements IQuery {
  constructor(
    public readonly userId: string,
    public readonly projectId: string,

    public readonly context: RequestContext,
  ) {}
}
