import { ApiResponseOf } from '@libs/response';
import { ObjectType } from '@nestjs/graphql';
import { CreateTaskOutput } from '../output/task.output';

@ObjectType()
export class CreateTaskResponse extends ApiResponseOf(CreateTaskOutput) {}
