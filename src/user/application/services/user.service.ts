import { ErrorCode, errorFactory } from '@libs/exception';
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserParam } from '@user/application/dto/param/create-user.param';
import { DeleteUserParam } from '@user/application/dto/param/delete-user.param';
import { UpdateUserParam } from '@user/application/dto/param/update-user.param';
import {
  IUserRepository,
  UserRepositorySymbol,
} from '@user/application/port/out/user-repository.port';
import { User } from '@user/domain/entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepositorySymbol)
    private readonly userRepository: IUserRepository,
  ) {}

  async createUser(param: CreateUserParam): Promise<User> {
    const user = await User.create({
      nickname: param.nickname,
      email: param.email,
      password: param.password,
      birthday: param.birthday,
    });
    await this.userRepository.createUser(user);
    return user;
  }

  async deleteUser(param: DeleteUserParam): Promise<User> {
    const user = await this.userRepository.findUser({ id: param.id });
    if (!user) {
      throw errorFactory(ErrorCode.USER_NOT_FOUND);
    }
    await this.userRepository.deleteUser({
      id: user.id,
    });
    return user;
  }
  async updateUser(param: UpdateUserParam): Promise<User> {
    const user = await this.userRepository.findUser({ id: param.id });
    if (!user) {
      throw errorFactory(ErrorCode.USER_NOT_FOUND);
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
