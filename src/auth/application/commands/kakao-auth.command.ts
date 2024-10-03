import { ICommand } from '@nestjs/cqrs';

export class KakaoAuthCommand implements ICommand {
  constructor(
    public readonly isTest: boolean,
    public readonly code: string,
  ) {}
}
