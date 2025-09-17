import { RequestContext } from '@libs/exception';
import { ICommand } from '@nestjs/cqrs';

export class ReissueTokenCommand implements ICommand {
  constructor(
    public readonly refreshToken: string,
    public readonly context: RequestContext,
  ) {}
}
