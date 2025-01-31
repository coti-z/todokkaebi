import { ICommand, IQuery } from '@nestjs/cqrs';
import { TaskState } from '@project/domain/value-objects/task-states.vo';

export class UpdateTaskCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly reqUserId: string,
    public readonly title?: string,
    public readonly categoryId?: string,

    public readonly status?: TaskState,
    public readonly check?: boolean,

    public readonly startDate?: Date,
    public readonly endDate?: Date,

    public readonly actualStartDate?: Date,

    public readonly actualEndDate?: Date,
  ) {}
}
