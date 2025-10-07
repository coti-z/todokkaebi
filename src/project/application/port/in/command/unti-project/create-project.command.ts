import { ICommand } from '@nestjs/cqrs';

import { RequestContext } from '@libs/exception';

export class CreateProjectCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly name: string,

    public readonly context: RequestContext,
  ) {}
}
