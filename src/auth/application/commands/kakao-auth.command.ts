import { ICommand } from '@nestjs/cqrs';

export class KakaoAuthCommand implements ICommand {
  constructor(public readonly code: string) {}
}
