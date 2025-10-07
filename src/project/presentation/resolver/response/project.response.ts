import { ObjectType } from '@nestjs/graphql';

import { ApiResponseOf } from '@libs/response';

import {
  CreateProjectOutput,
  DeleteProjectOutput,
  QueryProjectOutput,
  QueryProjectsOutput,
  UpdateProjectOutput,
} from '@project/presentation/resolver/output/project.output';

@ObjectType()
export class CreateProjectResponse extends ApiResponseOf(CreateProjectOutput) {}

@ObjectType()
export class DeleteProjectResponse extends ApiResponseOf(DeleteProjectOutput) {}

@ObjectType()
export class UpdateProjectResponse extends ApiResponseOf(UpdateProjectOutput) {}

@ObjectType()
export class QueryProjectResponse extends ApiResponseOf(QueryProjectOutput) {}

@ObjectType()
export class QueryProjectsResponse extends ApiResponseOf(QueryProjectsOutput) {}
