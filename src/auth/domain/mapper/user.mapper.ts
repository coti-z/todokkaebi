import { UserModel } from '@/auth/domain/model/user.model';
import { User } from '@prisma/client';

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
