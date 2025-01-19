import { IQuery } from '@nestjs/cqrs';

export class ProjectsByUserIdQuery implements IQuery {
  constructor(public readonly userId: string) {}
}
