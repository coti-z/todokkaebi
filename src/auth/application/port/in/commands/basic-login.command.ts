import { ICommand } from '@nestjs/cqrs';

import { RequestContext } from '@libs/exception';

export class BasicLoginCommand implements ICommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly context: RequestContext,
  ) {}
}
