import { ICommand } from '@nestjs/cqrs';

import { RequestContext } from '@libs/exception';

export class ChangeCategoryNameCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly name: string,
    public readonly categoryId: string,
    public readonly context: RequestContext,
  ) {}
}
