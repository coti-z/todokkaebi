import { RequestContext } from '@libs/exception';
import { ICommand } from '@nestjs/cqrs';

export class DeleteCategoryCommand implements ICommand {
  constructor(
    public readonly categoryId: string,
    public readonly userId: string,

    public readonly context: RequestContext,
  ) {}
}
