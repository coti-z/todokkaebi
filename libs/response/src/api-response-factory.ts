// api-response-factory.ts
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { HttpStatus } from '@nestjs/common';
import { ClassType } from 'type-graphql';

export function ApiResponseOf<T extends object>(classRef: ClassType<T>) {
  @ObjectType({ isAbstract: true })
  abstract class ApiResponseHost {
    @Field(() => Int)
    status: HttpStatus;

    @Field({ nullable: true })
    message?: string;

    @Field(() => classRef, { nullable: true })
    data?: T;
  }
  return ApiResponseHost;
}
