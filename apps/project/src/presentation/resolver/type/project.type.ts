import { Field, ObjectType } from '@nestjs/graphql';
import { CategoryType } from '@project/presentation/resolver/type/category.type';
import { ProjectMembershipType } from '@project/presentation/resolver/type/project-membership.type';
import { ProjectInvitationType } from '@project/presentation/resolver/type/project-invitation.type';

@ObjectType()
export class ProjectType {
  @Field()
  id: string;

  @Field()
  adminId: string;

  @Field()
  name: string;

  @Field()
  updatedAt: Date;

  @Field()
  createdAt: Date;

  @Field(() => [ProjectMembershipType])
  memberships: ProjectMembershipType[];

  @Field(() => [CategoryType])
  categories: CategoryType[];

  @Field(() => [ProjectInvitationType])
  projectInvitations: ProjectInvitationType[];
}
