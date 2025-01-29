import { Field, InputType, PickType } from '@nestjs/graphql';
import { TaskType } from '../type/task.type';

@InputType()
export class TaskBaseInput {
  @Field()
  categoryId: string;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field()
  title: string;
}

@InputType()
export class CreateTaskInput extends PickType(TaskBaseInput, [
  'categoryId',
  'startDate',
  'endDate',
  'title',
]) {}
