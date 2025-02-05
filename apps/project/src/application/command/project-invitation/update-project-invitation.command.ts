import type { ICommand } from '@nestjs/cqrs';
import type { InvitationStatus } from '@project/domain/value-objects/invation-status.vo';

export class UpdateProjectInvitationCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly reqUserId: string,
    public readonly status: InvitationStatus,
  ) {}
}
