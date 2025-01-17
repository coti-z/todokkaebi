import { ObjectType, PickType } from '@nestjs/graphql';
import { ProjectType } from '@project/presentation/resolver/type/project.type';

@ObjectType()
export class DeleteProjectOutput extends PickType(ProjectType, [
  'id',
] as const) {}
