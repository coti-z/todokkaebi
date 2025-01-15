import { ApiResponseOf } from '@libs/response/api-response-factory';
import { CreateProjectOutput } from '@project/presentation/resolver/project/output/create-prioject.output';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateProjectResponse extends ApiResponseOf(CreateProjectOutput) {}
