import { Field, ObjectType } from '@nestjs/graphql';
import { TaskType } from '@project/presentation/resolver/type/task.type';

@ObjectType()
export class CategoryType {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  projectId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [TaskType])
  tasks: TaskType[];
}
