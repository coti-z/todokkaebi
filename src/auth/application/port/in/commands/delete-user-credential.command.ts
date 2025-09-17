import { RequestContext } from '@libs/exception';
import { ICommand } from '@nestjs/cqrs';

export class DeleteUserCredentialCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly context: RequestContext,
  ) {}
}
