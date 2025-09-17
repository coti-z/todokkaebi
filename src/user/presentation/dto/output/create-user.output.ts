import { ApiResponseOf } from '@libs/response';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateUserOutput {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  nickname: string;

  @Field(() => Date, { nullable: true })
  birthday?: Date;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
@ObjectType()
export class ApiResponseOfCreateUserOutput extends ApiResponseOf(
  CreateUserOutput,
) {}
