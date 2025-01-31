import { Field, ObjectType } from '@nestjs/graphql';
import { TaskType } from '../type/task.type';

@ObjectType()
export class CreateTaskOutput extends TaskType {}

@ObjectType()
export class UpdateTaskOutput extends TaskType {}

@ObjectType()
export class QueryTaskByIdOutput extends TaskType {}

@ObjectType()
export class QueryTaskByCategoryIdOutput {
  @Field(() => [TaskType])
  tasks: TaskType[];
}
