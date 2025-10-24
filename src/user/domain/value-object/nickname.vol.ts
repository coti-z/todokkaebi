import { DomainException, ErrorCode } from '@libs/exception';

export interface NicknameProp {
  nickname: string;
}
export class Nickname {
  private readonly value: string;

  private constructor(prop: NicknameProp) {
    this.value = prop.nickname;
  }

  static create(prop: NicknameProp): Nickname {
    this.validateNickname(prop.nickname);
    return new Nickname({ nickname: prop.nickname });
  }

  getValue(): string {
    return this.value;
  }

  /**
   * Validate nickname constraints
   *
   * @private
   * @param {string} nickname - User nickname
   * @memberof User
   *
   * @remarks
   * Business rules:
   * - Nickname must not be empty or whitespace only
   * - Length must be between 2 and 50 characters
   */
  private static validateNickname(nickname: string): void {
    if (!nickname || nickname.trim().length === 0) {
      throw new DomainException(ErrorCode.INVALID_NICKNAME_FORMAT);
    }
    if (nickname.length < 2 || nickname.length > 50) {
      throw new DomainException(ErrorCode.INVALID_NICKNAME_FORMAT);
    }
  }
}
