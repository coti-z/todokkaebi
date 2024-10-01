import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateProjectInput {
  @Field()
  projectId: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  startDate: Date;

  @Field({ nullable: true })
  endDate: Date;

  @Field({ nullable: true })
  actualEndDate: Date;
}
