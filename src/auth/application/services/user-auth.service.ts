import { Injectable } from '@nestjs/common';
import { UserRepository } from '@src/auth/infrastructure/database/repository/user.repository';
import { CreateUserCommand } from '@src/auth/application/commands/create-user.command';
import { ErrorCode, errorFactory } from '@libs/exception';
import { UserModel } from '@src/auth/domain/model/user.model';
import { UpdateUserInfoCommand } from '@src/auth/application/commands/update-user-info.command';

@Injectable()
export class UserAuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(command: CreateUserCommand): Promise<UserModel> {
    const user = await this.userRepository.getUserWithEmail(command.email);
    if (user) {
      throw errorFactory(ErrorCode.USER_ALREADY_EXISTS);
    }
    return await this.userRepository.createUser({
      ...command,
    });
  }

  async deleteUser(id: string): Promise<UserModel> {
    const user = await this.userRepository.getUser(id);
    if (!user) {
      throw errorFactory(ErrorCode.BAD_REQUEST);
    }
    return await this.userRepository.deleteUser(id);
  }

  async getUser(id: string): Promise<UserModel> {
    const user = await this.userRepository.getUser(id);
    if (!user) {
      throw errorFactory(ErrorCode.USER_NOT_FOUND);
    }

    return user;
  }
  async updateUser(cmd: UpdateUserInfoCommand): Promise<UserModel> {
    const user = await this.userRepository.getUser(cmd.id);
    if (!user) {
      throw errorFactory(ErrorCode.USER_NOT_FOUND);
    }
    return await this.userRepository.updateUser(cmd.id, { ...cmd });
  }
}
