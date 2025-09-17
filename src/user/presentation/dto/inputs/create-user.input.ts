import { Field, InputType } from '@nestjs/graphql';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsNotEmpty()
  nickname: string;

  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field(() => String)
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  password: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDateString()
  birthday?: Date;
}
