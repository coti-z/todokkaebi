import { Field, InputType, PickType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType('ProjectInputType')
export class Project {
  @Field()
  @IsNotEmpty()
  projectId: string;

  @Field()
  @IsNotEmpty()
  @IsString()
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
