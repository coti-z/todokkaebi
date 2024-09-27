import { UserModel } from '@/auth/domain/model/user.model';
import { User } from '@prisma/client';

export class UserMapper {
  static toDomain(user: User): UserModel {
    return UserModel.create({
      ...user,
      birthday: user.birthday ?? undefined,
      email: user.email ?? undefined,
    });
  }
}
