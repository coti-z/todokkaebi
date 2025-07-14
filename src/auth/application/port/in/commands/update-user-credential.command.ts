import { ICommand } from '@nestjs/cqrs';

export class UpdateUserCredentialCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly email?: string,
    public readonly passwordHash?: string,
  ) {}
}
