import { RequestContext } from '@libs/exception';
import { ICommand } from '@nestjs/cqrs';

export class CreateProjectCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly name: string,

    public readonly context: RequestContext,
  ) {}
}
