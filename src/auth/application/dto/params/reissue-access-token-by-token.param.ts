import { Token } from '@auth/domain/entity/token.entity';

export class reissueAccessTokenByTokenParam {
  constructor(public readonly token: Token) {}
}
