import { DomainException, ErrorCode } from '@libs/exception';

export class PasswordPolicy {
  static async validateSamePassword(
    plainPassword: string,
    hashedPassword: string,
  ) {
    if (!plainPassword || !hashedPassword) {
      throw new DomainException(ErrorCode.UNAUTHORIZED);
    }
    if (plainPassword !== hashedPassword) {
      throw new DomainException(ErrorCode.UNAUTHORIZED);
    }
  }
}
