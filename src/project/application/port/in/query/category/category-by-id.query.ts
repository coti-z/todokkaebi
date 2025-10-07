import { IQuery } from '@nestjs/cqrs';

import { RequestContext } from '@libs/exception';

export class CategoryByIdQuery implements IQuery {
  constructor(
    public readonly userId: string,
    public readonly categoryId: string,

    public readonly context: RequestContext,
  ) {}
}
