import { User } from '@user/domain/entity/user.entity';

interface UserPersistenceRecord {
  id: string;
  email: string;
  nickname: string;
  password: string;
  birthday?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class UserMapper {
  static toPersistence(user: User): UserPersistenceRecord {
    return {
      id: user.id,
      birthday: user.birthday,
      createdAt: user.createdAt,
      password: user.hashedPassword,
      email: user.email.getValue(),
      nickname: user.nickname.getValue(),
      updatedAt: user.updatedAt,
    };
  }

  static toDomain(record: UserPersistenceRecord): User {
    return User.fromPersistence({
      id: record.id,
      email: record.email,
      hashedPassword: record.password,
      nickname: record.nickname,
      updatedAt: record.updatedAt,
      createdAt: record.createdAt,
      birthday: record.birthday,
    });
  }
}
