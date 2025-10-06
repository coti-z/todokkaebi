import { DomainException, ErrorCode } from '@libs/exception';

export class PasswordPolicy {
  static validateSamePassword(
    requestHashedPassword: string,
    hashedPassword: string,
  ) {
    if (!requestHashedPassword || !hashedPassword) {
      throw new DomainException(ErrorCode.BAD_REQUEST);
    }
    if (requestHashedPassword !== hashedPassword) {
      throw new DomainException(ErrorCode.UNAUTHORIZED);
    }
  }
}
