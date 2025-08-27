import { ICommand } from '@nestjs/cqrs';

export class BasicLogoutCommand implements ICommand {
  constructor(public readonly accessToken: string) {}
}
