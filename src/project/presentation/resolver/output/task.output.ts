import { Field, ObjectType, PickType } from '@nestjs/graphql';

import { TaskType } from '@project/presentation/resolver/type/task.type';

@ObjectType()
export class CreateTaskOutput extends TaskType {}

@ObjectType()
export class UpdateTaskOutput extends TaskType {}

@ObjectType()
export class DeleteTaskOutput extends PickType(TaskType, ['id']) {}

@ObjectType()
export class QueryTaskByIdOutput extends TaskType {}

@ObjectType()
export class QueryTaskByCategoryIdOutput {
  @Field(() => [TaskType])
  tasks: TaskType[];
}
