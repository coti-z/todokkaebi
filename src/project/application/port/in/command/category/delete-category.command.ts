import { ICommand } from '@nestjs/cqrs';

import { RequestContext } from '@libs/exception';

export class DeleteCategoryCommand implements ICommand {
  constructor(
    public readonly categoryId: string,
    public readonly userId: string,

    public readonly context: RequestContext,
  ) {}
}
