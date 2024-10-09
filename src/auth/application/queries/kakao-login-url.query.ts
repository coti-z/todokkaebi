import { IQuery } from '@nestjs/cqrs';

export class KakaoLoginUrlQuery implements IQuery {
  constructor(public readonly test: boolean) {}
}
