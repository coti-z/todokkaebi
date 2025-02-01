import { Field, InputType, PickType } from '@nestjs/graphql';

@InputType()
export class ProjectInvitationBaseInput {
  @Field()
  projectId: string;

  @Field()
  inviterUserId: string;

  @Field()
  inviteeUserId: string;
}

@InputType()
export class CreateProjectInvitationInput extends PickType(
  ProjectInvitationBaseInput,
  ['inviteeUserId', 'projectId'],
) {}
