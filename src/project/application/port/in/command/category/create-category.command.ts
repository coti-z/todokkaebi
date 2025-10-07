import { ICommand } from '@nestjs/cqrs';

import { RequestContext } from '@libs/exception';

export class CreateCategoryCommand implements ICommand {
  constructor(
    public readonly projectId: string,
    public readonly name: string,
    public readonly userId: string,

    public readonly context: RequestContext,
  ) {}
}
