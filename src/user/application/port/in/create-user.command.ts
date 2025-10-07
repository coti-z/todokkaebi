import { ICommand } from '@nestjs/cqrs';

import { RequestContext } from '@libs/exception';

export class CreateUserCommand implements ICommand {
  constructor(
    public readonly email: string,
    public readonly nickname: string,
    public readonly password: string,
    public readonly context: RequestContext,
    public readonly birthday?: Date,
  ) {}
}
