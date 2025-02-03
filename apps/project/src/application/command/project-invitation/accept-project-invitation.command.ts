import { ICommand } from '@nestjs/cqrs';

export class AcceptProjectInvitationCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly reqUserId: string,
  ) {}
}
