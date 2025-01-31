import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { TaskState } from '../type/task.type';

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
  id: string;
}

@InputType()
export class QueryTaskByIdInput extends PickType(TaskBaseInput, ['id']) {}

@InputType()
export class QueryTasksByCategoryIdInput extends PickType(TaskBaseInput, [
  'categoryId',
]) {}
