import { ICommand } from '@nestjs/cqrs';

export class DeleteTaskCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly reqUserId: string,
  ) {}
}
