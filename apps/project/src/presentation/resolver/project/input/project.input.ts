import { Field, InputType, PickType } from '@nestjs/graphql';

@InputType('ProjectInputType')
export class Project {
  @Field()
  projectId: string;

  @Field()
  name: string;
}

@InputType()
export class CreateProjectInput extends PickType(Project, ['name']) {}

@InputType()
export class DeleteProjectInput extends PickType(Project, ['projectId']) {}

@InputType()
export class UpdateProjectInput extends PickType(Project, [
  'projectId',
  'name',
]) {}

@InputType()
export class QueryProjectInput extends PickType(Project, ['projectId']) {}

@InputType()
export class QueryProjectsInput {}
