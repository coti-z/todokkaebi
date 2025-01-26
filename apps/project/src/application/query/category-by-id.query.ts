import { IQuery } from '@nestjs/cqrs';

export class CategoryByIdQuery implements IQuery {
  constructor(
    public readonly userId: string,
    public readonly categoryId: string,
  ) {}
}
