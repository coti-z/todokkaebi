import { ApiResponseOf } from '@libs/response/api-response-factory';
import { CreateProjectOutput } from '@project/presentation/resolver/project/output/create-prioject.output';
import { ObjectType } from '@nestjs/graphql';
import { DeleteProjectOutput } from '@project/presentation/resolver/project/output/delete-project.output';
import { QueryProjectOutput } from '@project/presentation/resolver/project/output/query-project.output';
import { QueryProjectsOutput } from '@project/presentation/resolver/project/output/query-projects.output';

@ObjectType()
export class CreateProjectResponse extends ApiResponseOf(CreateProjectOutput) {}

@ObjectType()
export class DeleteProjectResponse extends ApiResponseOf(DeleteProjectOutput) {}

@ObjectType()
export class QueryProjectResponse extends ApiResponseOf(QueryProjectOutput) {}

@ObjectType()
export class QueryProjectsResponse extends ApiResponseOf(QueryProjectsOutput) {}
