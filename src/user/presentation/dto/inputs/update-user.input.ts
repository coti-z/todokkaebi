import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  nickname?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  password?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  email?: string;
}
