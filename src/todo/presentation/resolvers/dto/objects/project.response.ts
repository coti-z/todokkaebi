import { ProjectModel } from '@/todo/domain/model/project.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProjectResponse {
  @Field()
  success: boolean;

  @Field()
  project: ProjectModel;
}
