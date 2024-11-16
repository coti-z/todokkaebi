import { User } from '@prisma/client';
import { UserModel } from '@src/auth/domain/model/user.model';

export class UserMapper {
  static toDomain(user: User): UserModel {
    return UserModel.create({
      ...user,
      password: user.password ?? undefined,
      birthday: user.birthday ?? undefined,
      email: user.email ?? undefined,
    });
  }
}
