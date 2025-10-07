import { ICommand } from '@nestjs/cqrs';

import { RequestContext } from '@libs/exception';

export class RejectProjectInvitationCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly reqUserId: string,

    public readonly context: RequestContext,
  ) {}
}
