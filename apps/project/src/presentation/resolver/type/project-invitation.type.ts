import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

enum InvitationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

registerEnumType(InvitationStatus, {
  name: 'InvitationStatus',
  description: 'Invitation status',
});

@ObjectType()
export class ProjectInvitationType {
  @Field()
  id: string;

  @Field()
  projectId: string;

  @Field()
  inviterUserId: string;

  @Field()
  inviteeUserId: string;

  @Field(() => InvitationStatus)
  status: InvitationStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
