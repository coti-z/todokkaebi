export const PASSWORD_HASHER_OUTBOUND_PORT = Symbol(
  'PASSWORD_HASHER_OUTBOUND_PORT',
);

export interface IPasswordHasherOutboundPort {
  /**
   * 평문 비밀번호를 해싱합니다.
   * @param password 평문 비밀번호
   * @returns 해싱된 비밀번호
   */
  hash(password: string): Promise<string>;

  /**
   * 평문 비밀번호와 해시를 비교합니다.
   * @param password 평문 비밀번호
   * @param hashedPassword 해싱된 비밀번호
   * @returns 일치 여부
   */
  compare(password: string, hashedPassword: string): Promise<boolean>;
}
