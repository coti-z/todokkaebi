import { ICommand } from '@nestjs/cqrs';

export class UpdateCategoryCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly id: string,
    public readonly name: string,
  ) {}
}
