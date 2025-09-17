import { DomainException, ErrorCode } from '@libs/exception';
import * as bcrypt from 'bcrypt';

export class PasswordPolicy {
  static async validateSamePassword(
    plainPassword: string,
    hashedPassword: string,
  ) {
    if (!plainPassword || !hashedPassword) {
      throw new DomainException(ErrorCode.UNAUTHORIZED);
    }
    const isValid = await bcrypt.compare(plainPassword, hashedPassword);
    if (!isValid) {
      throw new DomainException(ErrorCode.UNAUTHORIZED);
    }
  }
}
