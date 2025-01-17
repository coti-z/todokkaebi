import { Field, ObjectType } from '@nestjs/graphql';
import { ProjectType } from '@project/presentation/resolver/type/project.type';

@ObjectType()
export class QueryProjectsOutput {
  @Field(() => [ProjectType])
  projects: ProjectType[];
}
