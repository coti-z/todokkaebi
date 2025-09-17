import { RequestContext } from '@libs/exception';
import { ICommand } from '@nestjs/cqrs';

export class ChangeCategoryNameCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly name: string,
    public readonly categoryId: string,
    public readonly context: RequestContext,
  ) {}
}
