import { Field, InputType } from '@nestjs/graphql';
import { IsDate } from 'class-validator';

@InputType()
export class CreateProjectInput {
  @Field()
  name: string;

  @Field()
  @IsDate({
    message: '유효한 날짜 형식을 입력 해야합니다.',
  })
  startDate: Date;

  @Field()
  @IsDate({
    message: '유효한 날짜 형식을 입력 해야합니다.',
  })
  endDate: Date;

  @Field({
    nullable: true,
  })
  description?: string;
}
