import { UpdateUserInfoCommand } from '@/auth/application/commands/update-user-info.command';
import { UserModel } from '@/auth/domain/model/user.model';
import { UserRepository } from '@/auth/infrastructure/database/repository/user.repository';
import { ErrorCode } from '@/utils/exception/error-code.enum';
import { errorFactory } from '@/utils/exception/error-factory.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserAuthService {
  constructor(private readonly userRepository: UserRepository) {}

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
    const user = await this.userRepository.getUser(cmd.userId);
    if (!user) {
      throw errorFactory(ErrorCode.USER_NOT_FOUND);
    }
    return await this.userRepository.updateUser(cmd.userId, { ...cmd });
  }
}
