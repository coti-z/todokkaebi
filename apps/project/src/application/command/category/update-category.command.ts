import { ICommand } from '@nestjs/cqrs';

export class UpdateCategoryCommand implements ICommand {
  constructor(
    public readonly reqUserId: string,
    public readonly name: string,
    public readonly categoryId: string,
    public readonly projectId: string,
  ) {}
}
