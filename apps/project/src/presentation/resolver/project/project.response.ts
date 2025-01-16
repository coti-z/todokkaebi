import { ApiResponseOf } from '@libs/response/api-response-factory';
import { CreateProjectOutput } from '@project/presentation/resolver/project/output/create-prioject.output';
import { ObjectType } from '@nestjs/graphql';
import { DeleteProjectOutput } from '@project/presentation/resolver/project/output/delete-project.output';

@ObjectType()
export class CreateProjectResponse extends ApiResponseOf(CreateProjectOutput) {}

@ObjectType()
export class DeleteProjectResponse extends ApiResponseOf(DeleteProjectOutput) {}
