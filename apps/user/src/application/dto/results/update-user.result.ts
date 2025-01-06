import { ObjectType, PickType } from '@nestjs/graphql';
import { CreateUserResult } from '@user/application/dto/results/create-user.result';

@ObjectType()
export class UpdateUserResult extends PickType(CreateUserResult, [
  'id',
  'email',
  'nickname',
  'birthday',
  'updatedAt',
  'createdAt',
]) {}