import { ICommand } from '@nestjs/cqrs';

import { RequestContext } from '@libs/exception';

export class BasicLogoutCommand implements ICommand {
  constructor(
    public readonly accessToken: string,
    public readonly context: RequestContext,
  ) {}
}
