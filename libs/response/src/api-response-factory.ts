// api-response-factory.ts
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { HttpStatus } from '@nestjs/common';
import { ClassType } from 'type-graphql';
import { ApiResponse } from '@libs/response';

export function ApiResponseOf<T extends object>(classRef: ClassType<T>) {
  @ObjectType({ isAbstract: true })
  abstract class ApiResponseHost implements ApiResponse<T> {
    @Field(() => Int)
    status: HttpStatus;

    @Field()
    success: boolean;

    @Field({ nullable: true })
    message?: string;

    @Field(() => classRef, { nullable: true })
    data?: T;
  }
  return ApiResponseHost;
}
