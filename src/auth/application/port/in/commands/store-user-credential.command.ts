/**
 * TODO
 * @task implement command for sending to handler
 */
import { ICommand } from '@nestjs/cqrs';

import { RequestContext } from '@libs/exception';

export class StoreUserCredentialCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly passwordHash: string,
    public readonly context: RequestContext,
  ) {}
}
