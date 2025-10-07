import { ICommand } from '@nestjs/cqrs';

import { RequestContext } from '@libs/exception';

export class UpdateUserCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly context: RequestContext,
    public readonly nickname?: string,
    public readonly email?: string,
    public readonly password?: string,
    public readonly birthday?: Date,
  ) {}
}
