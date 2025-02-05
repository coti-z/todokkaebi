import { ICommand } from '@nestjs/cqrs';

export class ChangeCategoryNameCommand implements ICommand {
  constructor(
    public readonly reqUserId: string,
    public readonly name: string,
    public readonly categoryId: string,
  ) {}
}
