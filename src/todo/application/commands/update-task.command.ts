import { ICommand } from '@nestjs/cqrs';
import { TaskState } from '@prisma/client';

export class UpdateTaskCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly id: string,
    public readonly taskState: TaskState,
    public readonly title?: string,
    public readonly startDate?: Date,
    public readonly endDate?: Date,
    public readonly categoryId?: string,
  ) {}
}
