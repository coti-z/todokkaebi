import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { TaskState } from '@project/presentation/resolver/type/task.type';

@InputType()
export class TaskBaseInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @Field()
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  status: TaskState;

  @Field({ nullable: true })
  @IsOptional()
  check: boolean;

  @Field()
  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @Field()
  @IsNotEmpty()
  @IsDate()
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
  @IsNotEmpty()
  @IsUUID()
  taskId: string;
}

@InputType()
export class DeleteTaskInput {
  @Field()
  @IsNotEmpty()
  @IsUUID()
  taskId: string;
}

@InputType()
export class QueryTaskByIdInput {
  @Field()
  @IsNotEmpty()
  @IsUUID()
  taskId: string;
}

@InputType()
export class QueryTasksByCategoryIdInput extends PickType(TaskBaseInput, [
  'categoryId',
]) {}
