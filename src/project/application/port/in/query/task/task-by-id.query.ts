import { IQuery } from '@nestjs/cqrs';

import { RequestContext } from '@libs/exception';

export class TaskByIdQuery implements IQuery {
  constructor(
    public readonly userId: string,
    public readonly id: string,
    public readonly context: RequestContext,
  ) {}
}
