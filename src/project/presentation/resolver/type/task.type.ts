import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum TaskState {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETE = 'COMPLETE',
}
registerEnumType(TaskState, {
  name: 'Status',
  description: 'The status of the task',
});

@ObjectType()
export class TaskType {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  categoryId: string;

  @Field()
  check: boolean;

  @Field(() => TaskState)
  taskStatus: TaskState;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field()
  actualStartDate: Date;

  @Field({ nullable: true })
  actualEndDate?: Date;

  @Field()
  createdAt: Date;

  @Field()
  updateAt: Date;
}
