import { CreateUserProps, User } from '@user/domain/entity/user.entity';
import { Email } from '@user/domain/value-object/email.vo';
import { Nickname } from '@user/domain/value-object/nickname.vol';

describe('user entity', () => {
  describe('constructor', () => {
    it('constructor', async () => {
      const email = Email.create({ email: 'existing@example.com' });
      const nickname = Nickname.create({ nickname: 'existingUser' });
      const userPropsDate: CreateUserProps = {
        email,
        nickname,
        hashedPassword: 'hashed_password',
      };

      const user = User.create(userPropsDate);

      expect(user.email).toBe(userPropsDate.email);
      expect(user.nickname).toBe(userPropsDate.nickname);
    });
  });

  describe('method', () => {
    it('changeProfile', async () => {
      const email = Email.create({ email: 'existing@example.com' });
      const newEmail = Email.create({ email: 'new@example.com' });
      const nickname = Nickname.create({ nickname: 'existingUser' });

      const user = User.create({
        email,
        nickname,
        hashedPassword: 'hashed',
        birthday: new Date('1995-09-30'),
      });

      user.changeEmail(newEmail);

      expect(user.email.equals(newEmail)).toBe(true);
    });
  });
});
