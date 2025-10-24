import { Inject, Injectable } from '@nestjs/common';

import { User } from '@user/domain/entity/user.entity';
import {
  IPasswordHasherOutboundPort,
  PASSWORD_HASHER_OUTBOUND_PORT,
} from '@user/domain/port/out/i-password-hasher.port';
import { Email } from '@user/domain/value-object/email.vo';
import { Nickname } from '@user/domain/value-object/nickname.vol';

export type NewUserParam = {
  email: string;
  nickName: string;
  plainPassword: string;
  birthday?: Date;
};
export type UpdateUserParam = Partial<
  Pick<NewUserParam, 'email' | 'birthday' | 'nickName' | 'plainPassword'>
> & {
  user: User;
};
export type DeleteUserParam = {
  id: string;
};

@Injectable()
export class UserDomainService {
  constructor(
    @Inject(PASSWORD_HASHER_OUTBOUND_PORT)
    private readonly passwordHasher: IPasswordHasherOutboundPort,
  ) {}

  async registerNewUser(param: NewUserParam): Promise<User> {
    const email = Email.create({
      email: param.email,
    });
    const nickname = Nickname.create({ nickname: param.nickName });
    const hashed = await this.passwordHasher.hash(param.plainPassword);
    return User.create({
      email: email,
      hashedPassword: hashed,
      nickname: nickname,
      birthday: param.birthday,
    });
  }

  async updateUserProfile(param: UpdateUserParam): Promise<User> {
    if (param.birthday) {
      param.user.changeBirthday(param.birthday);
    }

    if (param.email) {
      param.user.changeEmail(
        Email.create({
          email: param.email,
        }),
      );
    }

    if (param.nickName) {
      param.user.changeNickname(Nickname.create({ nickname: param.nickName }));
    }

    if (param.plainPassword) {
      const hashedPassword = await this.passwordHasher.hash(
        param.plainPassword,
      );
      param.user.changePassword(hashedPassword);
    }

    return param.user;
  }
}
