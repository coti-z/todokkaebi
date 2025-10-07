import { ICommand } from '@nestjs/cqrs';

import { RequestContext } from '@libs/exception';

export class CreateProjectInvitationCommand implements ICommand {
  constructor(
    public readonly projectId: string,
    public readonly inviterUserId: string,
    public readonly inviteeUserId: string,

    public readonly context: RequestContext,
  ) {}
}
