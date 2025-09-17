import { RequestContext } from '@libs/exception';
import { IQuery } from '@nestjs/cqrs';

export class TasksByCategoryIdQuery implements IQuery {
  constructor(
    public readonly categoryId: string,
    public readonly userId: string,
    public readonly context: RequestContext,
  ) {}
}
