import { Inject, Injectable } from '@nestjs/common';

import { ApplicationException, ErrorCode } from '@libs/exception';

import { CreateUserParam } from '@user/application/dto/param/create-user.param';
import { DeleteUserParam } from '@user/application/dto/param/delete-user.param';
import { UpdateUserParam } from '@user/application/dto/param/update-user.param';
import {
  IUserRepository,
  UserRepositorySymbol,
} from '@user/application/port/out/i-user-repository.port';
import { User } from '@user/domain/entity/user.entity';
import { UserDomainService } from '@user/domain/service/user.domain.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepositorySymbol)
    private readonly userRepository: IUserRepository,

    private readonly userDomainService: UserDomainService,
  ) {}

  async createUser(param: CreateUserParam): Promise<User> {
    const existingUser = await this.userRepository.findUserByEmail({
      email: param.email,
    });

    if (existingUser) {
      throw new ApplicationException(ErrorCode.USER_ALREADY_EXISTS);
    }

    const user = await this.userDomainService.registerNewUser({
      email: param.email,
      nickName: param.nickname,
      plainPassword: param.password,
      birthday: param.birthday,
    });
    await this.userRepository.createUser(user);

    return user;
  }
  async deleteUser(param: DeleteUserParam): Promise<User> {
    const existingUser = await this.userRepository.findUserById({
      id: param.id,
    });

    if (!existingUser) {
      throw new ApplicationException(ErrorCode.USER_NOT_FOUND);
    }
    await this.userDomainService.deleteUser({ user: existingUser });
    await this.userRepository.deleteUser({
      id: param.id,
    });

    return existingUser;
  }
  async updateUser(param: UpdateUserParam): Promise<User> {
    const existingUser = await this.userRepository.findUserById({
      id: param.id,
    });

    if (!existingUser) {
      throw new ApplicationException(ErrorCode.USER_NOT_FOUND);
    }
    const user = await this.userDomainService.updateUserProfile({
      user: existingUser,
      birthday: param.birthday,
      email: param.email,
      nickName: param.nickname,
      plainPassword: param.plainPassword,
    });

    await this.userRepository.updateUser(user);
    return user;
  }
}
