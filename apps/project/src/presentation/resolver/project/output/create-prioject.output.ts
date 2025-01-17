import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateProjectOutput {
  @Field()
  id: string;

  @Field()
  projectId: string;

  @Field()
  name: string;

  @Field()
  adminId: string;
}
