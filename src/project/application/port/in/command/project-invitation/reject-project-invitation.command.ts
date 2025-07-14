import { ICommand } from '@nestjs/cqrs';

export class RejectProjectInvitationCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly reqUserId: string,
  ) {}
}
