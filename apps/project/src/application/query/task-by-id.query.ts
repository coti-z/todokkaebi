import { IQuery } from '@nestjs/cqrs';

export class TaskByIdQuery implements IQuery {
  constructor(
    public readonly userId: string,
    public readonly id: string,
  ) {}
}
