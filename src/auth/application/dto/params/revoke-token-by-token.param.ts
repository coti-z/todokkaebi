import { Token } from '@auth/domain/entity/token.entity';

export class RevokeTokenByTokenParam {
  constructor(public readonly token: Token) {}
}
