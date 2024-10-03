import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { TaskState } from '@prisma/client';
import { IsDate, IsOptional } from 'class-validator';

@InputType()
export class UpdateTaskInput {
  @Field()
  taskId: string;

  @Field({ nullable: true })
  @IsOptional()
  title?: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  endDate?: Date;

  @Field()
  categoryId: string;

  @Field({ nullable: true })
  taskState?: TaskState;

  @Field({ nullable: true })
  @IsOptional()
  check?: boolean;
}
