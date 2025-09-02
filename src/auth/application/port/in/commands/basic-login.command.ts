import { RequestContext } from '@libs/exception';
import { ICommand } from '@nestjs/cqrs';

export class BasicLoginCommand implements ICommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly context: RequestContext,
  ) {}
}
