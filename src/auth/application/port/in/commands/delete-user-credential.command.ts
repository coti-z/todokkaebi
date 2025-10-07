import { ICommand } from '@nestjs/cqrs';

import { RequestContext } from '@libs/exception';

export class DeleteUserCredentialCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly context: RequestContext,
  ) {}
}
