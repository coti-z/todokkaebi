import { Inject, Injectable } from '@nestjs/common';

import { ApplicationException, ErrorCode } from '@libs/exception';

import {
  PasswordHasherOutboundPort,
  PASSWORD_HASHER_OUTBOUND_PORT,
} from '@auth/application/port/out/password-hasher.port';

import { CreateUserParam } from '@user/application/dto/param/create-user.param';
import { DeleteUserParam } from '@user/application/dto/param/delete-user.param';
import { UpdateUserParam } from '@user/application/dto/param/update-user.param';
import {
  IUserRepository,
  UserRepositorySymbol,
} from '@user/application/port/out/i-user-repository.port';
import { User } from '@user/domain/entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepositorySymbol)
    private readonly userRepository: IUserRepository,

    @Inject(PASSWORD_HASHER_OUTBOUND_PORT)
    private readonly passwordHasher: PasswordHasherOutboundPort,
  ) {}

  async createUser(param: CreateUserParam): Promise<User> {
    const user = await this.userRepository.findUserByEmail({
      email: param.email,
    });
    if (user) {
      throw new ApplicationException(ErrorCode.USER_ALREADY_EXISTS);
    }

    // 1. 비밀번호 해싱 (Infrastructure 계층 사용)
    const hashedPassword = await this.passwordHasher.hash(param.password);

    // 2. 도메인 엔티티 생성 (순수)
    const newUser = User.create({
      nickname: param.nickname,
      email: param.email,
      hashedPassword: hashedPassword,
      birthday: param.birthday,
    });

    // 3. 저장
    await this.userRepository.createUser(newUser);
    return newUser;
  }

  async deleteUser(param: DeleteUserParam): Promise<User> {
    const user = await this.userRepository.findUserById({ id: param.id });
    if (!user) {
      throw new ApplicationException(ErrorCode.USER_NOT_FOUND);
    }
    await this.userRepository.deleteUser({
      id: user.id,
    });
    return user;
  }
  async updateUser(param: UpdateUserParam): Promise<User> {
    const user = await this.userRepository.findUserById({ id: param.id });
    if (!user) {
      throw new ApplicationException(ErrorCode.USER_NOT_FOUND);
    }
    user.changeProfile({
      birthday: param.birthday,
      email: param.email,
      nickname: param.nickname,
    });
    await this.userRepository.updateUser(user);
    return user;
  }
}
