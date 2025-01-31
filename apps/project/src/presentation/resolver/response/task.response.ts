import { ApiResponseOf } from '@libs/response';
import { ObjectType } from '@nestjs/graphql';
import {
  CreateTaskOutput,
  DeleteTaskOutput,
  QueryTaskByCategoryIdOutput,
  QueryTaskByIdOutput,
  UpdateTaskOutput,
} from '../output/task.output';

@ObjectType()
export class CreateTaskResponse extends ApiResponseOf(CreateTaskOutput) {}

@ObjectType()
export class UpdateTaskResponse extends ApiResponseOf(UpdateTaskOutput) {}

@ObjectType()
export class DeleteTaskResponse extends ApiResponseOf(DeleteTaskOutput) {}
@ObjectType()
export class QueryTaskByIdResponse extends ApiResponseOf(QueryTaskByIdOutput) {}

@ObjectType()
export class QueryTaskByCategoryIdResponse extends ApiResponseOf(
  QueryTaskByCategoryIdOutput,
) {}
