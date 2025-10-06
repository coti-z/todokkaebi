import { PasswordPolicy } from '@auth/domain/policy/password-policy';
import { DomainException, ErrorCode } from '@libs/exception';

describe('PasswordPolicy', () => {
  describe('validateSamePassword', () => {
    it('should throw BAD_REQUEST when plainPassword is empty', () => {
      const requestHashedPassword = null as any;
      const hashedPassword = 'hashed';
      try {
        PasswordPolicy.validateSamePassword(requestHashedPassword, hashedPassword);
      } catch (error) {
        expect(error).toBeInstanceOf(DomainException);
        expect(error.errorCode).toBe(ErrorCode.BAD_REQUEST);
      }
    });

    it('should throw BAD_REQUEST when hashedPassword is empty', () => {
      const requestHashedPassword = 'requestHashed';
      const hashedPassword = null as any;
      try {
        PasswordPolicy.validateSamePassword(requestHashedPassword, hashedPassword);
      } catch (error) {
        expect(error).toBeInstanceOf(DomainException);
        expect(error.errorCode).toBe(ErrorCode.BAD_REQUEST);
      }
    });

    it('should throw UNAUTHORIZED when passwords do not match', () => {
      const requestHashedPassword = 'hashed1';
      const hashedPassword = 'hashed2';
      try {
        PasswordPolicy.validateSamePassword(requestHashedPassword, hashedPassword);
      } catch (error) {
        expect(error).toBeInstanceOf(DomainException);
        expect(error.errorCode).toBe(ErrorCode.UNAUTHORIZED);
      }
    });

    it('should not throw when passwords match', async () => {
      const requestHashedPassword = 'hashed';
      const hashedPassword = 'hashed';
      expect(() =>
        PasswordPolicy.validateSamePassword(requestHashedPassword, hashedPassword),
      ).not.toThrow();
    });
  });
});
