import { CreateUserProps, User } from '@user/domain/entity/user.entity';

describe('user entity', () => {
  describe('constructor', () => {
    it('constructor', async () => {
      const userPropsDate: CreateUserProps = {
        email: 'project@mail.com',
        nickname: 'test',
        hashedPassword: 'hashed_password',
      };

      const user = User.create(userPropsDate);

      expect(user.email).toBe(userPropsDate.email);
      expect(user.nickname).toBe(userPropsDate.nickname);
    });
  });

  describe('method', () => {
    it('changeProfile', async () => {
      const userPropsDate: CreateUserProps = {
        email: 'project@mail.com',
        nickname: 'test',
        hashedPassword: 'hashed_password',
      };

      const user = await User.create(userPropsDate);
      const changeEmail = 'test@test.com';

      user.changeProfile({
        email: changeEmail,
      });

      expect(user.email).toBe(changeEmail);
    });
  });
});
