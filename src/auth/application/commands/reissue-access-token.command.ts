import { ICommand } from '@nestjs/cqrs';

export class ReissueAccessTokenCommand implements ICommand {
  constructor(public readonly refreshToken: string) {}
}
