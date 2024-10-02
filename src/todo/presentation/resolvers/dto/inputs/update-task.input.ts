import { Field, InputType } from '@nestjs/graphql';
import { TaskState } from '@prisma/client';
import { IsDate } from 'class-validator';

@InputType()
export class UpdateTaskInput {
  @Field()
  taskId: string;

  @Field()
  title: string;

  @Field()
  @IsDate()
  startDate: Date;

  @Field()
  @IsDate()
  endDate: Date;

  @Field()
  categoryId: string;

  @Field()
  taskState: TaskState;

  @Field()
  check: boolean;
}
