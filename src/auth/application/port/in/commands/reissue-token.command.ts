import { ICommand } from '@nestjs/cqrs';

export class ReissueTokenCommand implements ICommand {
  constructor(public readonly refreshToken: string) {}
}
