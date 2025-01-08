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
      password: user.password,
      email: user.email,
      nickname: user.nickname,
      updatedAt: user.updatedAt,
    };
  }

  static toDomain(record: UserPersistenceRecord): User {
    return User.fromPersistence({
      id: record.id,
      email: record.email,
      password: record.password,
      nickname: record.nickname,
      updatedAt: record.updatedAt,
      createdAt: record.createdAt,
      birthday: record.birthday,
    });
  }
}
