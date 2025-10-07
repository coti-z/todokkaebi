import { DomainException, ErrorCode } from '@libs/exception';

export class PasswordPolicy {
  static validateSamePassword(validateResult: boolean): void {
    if (!validateResult) {
      throw new DomainException(ErrorCode.UNAUTHORIZED);
    }
  }
}
