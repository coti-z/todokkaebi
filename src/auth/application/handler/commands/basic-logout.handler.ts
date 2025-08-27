import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { BasicLogoutCommand } from '@auth/application/port/in/commands/basic-logout.command';
import { ErrorHandlingStrategy } from '@libs/exception';
import { TokenService } from '@auth/application/service/token.service';
import { Token } from '@auth/domain/entity/token.entity';

@CommandHandler(BasicLogoutCommand)
export class BasicLogoutHandler implements ICommandHandler {
  constructor(private readonly tokenService: TokenService) {}
  async execute(command: BasicLogoutCommand): Promise<Token> {
    try {
      return await this.tokenService.revokeTokenByAccessToken({
        accessToken: command.accessToken,
      });
    } catch (error) {
      ErrorHandlingStrategy.handleError(error);
    }
  }
}
