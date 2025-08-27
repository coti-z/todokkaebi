import { IQuery } from '@nestjs/cqrs';

export class ValidateAccessTokenQuery implements IQuery {
  constructor(public readonly accessToken: string) {}
}
