import { ICommand } from '@nestjs/cqrs';

export class UpdateUserInfoCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly nickname: string,
    public readonly birthday: string,
  ) {}
}