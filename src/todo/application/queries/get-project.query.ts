import { IQuery } from '@nestjs/cqrs';

export class GetProjectQuery implements IQuery {
  constructor(
    public readonly userId: string,
    public readonly id: string,
  ) {}
}
