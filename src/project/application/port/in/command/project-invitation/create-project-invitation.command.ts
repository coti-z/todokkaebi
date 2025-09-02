import { RequestContext } from '@libs/exception';
import { ICommand } from '@nestjs/cqrs';

export class CreateProjectInvitationCommand implements ICommand {
  constructor(
    public readonly projectId: string,
    public readonly inviterUserId: string,
    public readonly inviteeUserId: string,

    public readonly context: RequestContext,
  ) {}
}
