import { PickType } from '@nestjs/swagger';

import { UserBaseDto } from '@user/presentation/dto/base/user-base.class';

export class CreateUserInput extends PickType(UserBaseDto, [
  'birthday',
  'email',
  'nickname',
]) {}
