import { IQuery } from '@nestjs/cqrs';

export class GetAllCategoriesQuery implements IQuery {
  constructor(
    public readonly userId: string,
    public readonly projectId: string,
  ) {}
}
