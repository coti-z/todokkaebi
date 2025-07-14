import { ICommand } from '@nestjs/cqrs';

export class CreateTaskCommand implements ICommand {
  constructor(
    public readonly title: string,
    public readonly categoryId: string,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly userId: string,
  ) {}
}
