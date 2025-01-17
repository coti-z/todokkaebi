import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

enum MembershipRole {
  OWNER = 'OWNER',
  MEMBER = 'MEMBER',
}

registerEnumType(MembershipRole, {
  name: 'MembershipRole',
  description: 'The member of the role',
});

@ObjectType()
export class ProjectMembershipType {
  @Field()
  id: string;

  @Field()
  userId: string;

  @Field()
  projectId: string;

  @Field(() => MembershipRole)
  role: MembershipRole;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
