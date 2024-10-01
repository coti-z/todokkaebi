import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { Category } from '@prisma/client';

@ObjectType()
export class CategoryModel implements Category {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  projectId: string;

  @HideField()
  createdAt: Date;

  @HideField()
  updatedAt: Date;
}
