import { ObjectType, PickType } from '@nestjs/graphql';
import { ProjectType } from '@project/presentation/resolver/type/project.type';

@ObjectType()
export class CreateProjectOutput extends PickType(ProjectType, [
  'id',
  'adminId',
  'name',
] as const) {}
