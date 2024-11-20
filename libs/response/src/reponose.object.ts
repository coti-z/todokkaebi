import { ObjectType, Field } from '@nestjs/graphql';
import { HttpStatus } from '@nestjs/common';

@ObjectType()
export class ResponseObj<T> {
  @Field()
  status: HttpStatus;

  @Field({ nullable: true })
  message?: string;

  @Field({ nullable: true })
  data?: T;
}
