import { ICommand } from '@nestjs/cqrs';

import { RequestContext } from '@libs/exception';

export class DeleteUserCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly context: RequestContext,
  ) {}
}
