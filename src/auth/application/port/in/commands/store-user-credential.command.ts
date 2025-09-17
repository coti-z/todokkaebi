/**
 * TODO
 * @task implement command for sending to handler
 */
import { RequestContext } from '@libs/exception';
import { ICommand } from '@nestjs/cqrs';

export class StoreUserCredentialCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly passwordHash: string,
    public readonly context: RequestContext,
  ) {}
}
