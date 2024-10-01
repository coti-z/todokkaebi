import { GetProjectQuery } from '@/todo/application/queries/get-project.query';
import { QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetProjectQuery)
export class GetProjectHandler {}
