import { Field, InputType, PickType } from '@nestjs/graphql';
import type { InvitationStatus } from '../type/project-invitation.type';

@InputType()
export class ProjectInvitationBaseInput {
  @Field()
  id: string;

  @Field()
  projectId: string;

  @Field()
  inviterUserId: string;

  @Field()
  inviteeUserId: string;

  @Field()
  status: InvitationStatus;
}

@InputType()
export class CreateProjectInvitationInput extends PickType(
  ProjectInvitationBaseInput,
  ['inviteeUserId', 'projectId'],
) {}

@InputType()
export class UpdateProjectInvitationStatusInput extends PickType(
  ProjectInvitationBaseInput,
  ['id', 'status'],
) {}
