import { Inject, Injectable } from '@nestjs/common';
import {
  IUserAuthRepositoryGeneric,
  PrismaUserAuthRepositoryArgs,
} from '@src/auth/domain/interface/user-repository.interface';
import { UserRepositorySymbol } from '@src/user/domain/interface/user-repository.interface';
import { UserModel } from '@src/auth/domain/model/user.model';
import { LoginDto } from '@src/auth/domain/model/login-user.model';
import { ErrorCode, errorFactory } from '@libs/exception';

@Injectable()
export class UserAuthService {
  constructor(
    @Inject(UserRepositorySymbol)
    private readonly userRepository: IUserAuthRepositoryGeneric<PrismaUserAuthRepositoryArgs>,
  ) {}

  async authenticate(dto: LoginDto): Promise<UserModel> {
    const user = await this.userRepository.findUser({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw errorFactory(ErrorCode.USER_NOT_FOUND);
    }

    if (user.password !== dto.password) {
      throw errorFactory(ErrorCode.VALIDATION_ERROR);
    }

    return user;
  }
  async logout(userId: string) {}
  async storeToken() {}
}
