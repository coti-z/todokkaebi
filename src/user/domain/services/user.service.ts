import { Inject, Injectable } from '@nestjs/common';

import { ErrorCode, errorFactory } from '@libs/exception';
import {
  IUserRepositoryGeneric,
  PrismaUserRepositoryArgs,
  UserRepositorySymbol,
} from '@src/user/domain/interface/user-repository.interface';
import { UserModel } from '@src/user/domain/model/user.model';
import { CreateUserDto } from '@src/user/domain/model/create-user.model';
import { UpdateUserDto } from '@src/user/domain/model/update-user.model';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepositorySymbol)
    private readonly userRepository: IUserRepositoryGeneric<PrismaUserRepositoryArgs>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<UserModel> {
    return await this.userRepository.createUser({
      data: {
        email: dto.email,
        nickname: dto.nickname,
        password: dto.password,
      },
    });
  }

  async deleteUser(id: string): Promise<UserModel> {
    return await this.userRepository.deleteUser({
      where: {
        id,
      },
    });
  }
  async updateUser(dto: UpdateUserDto): Promise<UserModel> {
    const data = this.removeUndefinedFields(dto);
    return await this.userRepository.updateUser({
      where: {
        id: dto.id,
      },
      data,
    });
  }
  async validateUserEmailDoesNotExist(email: string): Promise<void> {
    const user = await this.userRepository.findUser({
      where: {
        email: email,
      },
    });
    if (user) {
      throw errorFactory(ErrorCode.USER_ALREADY_EXISTS);
    }
  }
  async validateUserExists(id: string): Promise<void> {
    const user = await this.userRepository.findUser({
      where: {
        id,
      },
    });
    if (!user) {
      throw errorFactory(ErrorCode.BAD_REQUEST);
    }
  }
  private removeUndefinedFields(dto: UpdateUserDto): Partial<UpdateUserDto> {
    const result: Record<string, any> = {};

    Object.entries(dto).forEach(([key, value]) => {
      if (value !== undefined) {
        result[key] = value;
      }
    });

    return result as Partial<UpdateUserDto>;
  }
}
