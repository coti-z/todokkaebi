import { RequestContext } from '@libs/exception';
import { IQuery } from '@nestjs/cqrs';

export class ProjectByIdQuery implements IQuery {
  constructor(
    public readonly userId: string,
    public readonly projectId: string,

    public readonly context: RequestContext,
  ) {}
}
