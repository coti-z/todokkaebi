import { ICommand } from '@nestjs/cqrs';

import { RequestContext } from '@libs/exception';

export class UpdateUserCredentialCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly context: RequestContext,
    public readonly email?: string,
    public readonly passwordHash?: string,
  ) {}
}
