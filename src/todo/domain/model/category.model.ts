import { Field, ID } from '@nestjs/graphql';
import { Category } from '@prisma/client';

export class CategoryModel implements Category {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  projectId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
