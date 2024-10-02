import { TaskModel } from '@/todo/domain/model/task.model';
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

  @Field({ nullable: true })
  startedAt?: Date;

  @Field({ nullable: true })
  endedAt?: Date;

  @Field(() => [TaskModel], { nullable: true })
  tasks?: TaskModel[];
}
