import { IQuery } from '@nestjs/cqrs';

export class ValidateRefreshTokenQuery implements IQuery {
  constructor(public readonly refreshToken: string) {}
}
