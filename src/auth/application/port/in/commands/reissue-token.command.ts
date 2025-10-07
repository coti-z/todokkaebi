import { ICommand } from '@nestjs/cqrs';

import { RequestContext } from '@libs/exception';

export class ReissueTokenCommand implements ICommand {
  constructor(
    public readonly refreshToken: string,
    public readonly context: RequestContext,
  ) {}
}
