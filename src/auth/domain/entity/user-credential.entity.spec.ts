import { UserCredential, UserCredentialProps } from '@auth/domain/entity/user-credential.entity';

describe('UserCredential Entity', () => {
  describe('constructor', () => {
    it('should create user credential', () => {
      const createData: UserCredentialProps = {
        email: 'test@test.com',
        passwordHash: '1234',
        userId: '1234',
      };

      const userCredential = UserCredential.create(createData);

      expect(userCredential.email).toBe(createData.email);
      expect(userCredential.passwordHash).toBe(createData.passwordHash);
      expect(userCredential.userId).toBe(createData.userId);
    });
  });
});
