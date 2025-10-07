import { Field, ObjectType, PickType } from '@nestjs/graphql';

import { ProjectType } from '@project/presentation/resolver/type/project.type';

@ObjectType()
export class CreateProjectOutput extends PickType(ProjectType, [
  'id',
  'adminId',
  'name',
] as const) {}

@ObjectType()
export class DeleteProjectOutput extends PickType(ProjectType, [
  'id',
] as const) {}

@ObjectType()
export class UpdateProjectOutput extends PickType(ProjectType, [
  'id',
  'adminId',
  'name',
] as const) {}

@ObjectType()
export class QueryProjectOutput extends ProjectType {}

@ObjectType()
export class QueryProjectsOutput {
  @Field(() => [ProjectType])
  projects: ProjectType[];
}
