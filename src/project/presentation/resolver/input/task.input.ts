import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';

import { TaskState } from '@project/presentation/resolver/type/task.type';

@InputType()
export class TaskBaseInput {
  @Field()
  id: string;

  @Field()
  categoryId: string;
  @Field()
  title: string;

  @Field()
  status: TaskState;

  @Field()
  check: boolean;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;
}

@InputType()
export class CreateTaskInput extends PickType(TaskBaseInput, [
  'categoryId',
  'startDate',
  'endDate',
  'title',
]) {}
@InputType()
export class UpdateTaskInput extends PartialType(TaskBaseInput) {
  @Field()
  taskId: string;
}

@InputType()
export class DeleteTaskInput {
  @Field()
  taskId: string;
}

@InputType()
export class QueryTaskByIdInput {
  @Field()
  taskId: string;
}

@InputType()
export class QueryTasksByCategoryIdInput extends PickType(TaskBaseInput, [
  'categoryId',
]) {}
