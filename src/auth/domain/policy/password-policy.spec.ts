import { DomainException, ErrorCode } from '@libs/exception';

import { PasswordPolicy } from '@auth/domain/policy/password-policy';

describe('PasswordPolicy', () => {
  describe('validateSamePassword', () => {
    it('should throw BAD_REQUEST when validateResult is empty', () => {
      const validateResult = null as any;
      try {
        PasswordPolicy.validateSamePassword(validateResult);
      } catch (error) {
        expect(error).toBeInstanceOf(DomainException);
        expect(error.errorCode).toBe(ErrorCode.BAD_REQUEST);
      }
    });

    it('should not throw when passwords match', async () => {
      const validateResult = true;
      expect(() => PasswordPolicy.validateSamePassword(validateResult)).not.toThrow();
    });
  });
});
