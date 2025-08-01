import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TokenService } from '@auth/application/services/token.service';

import { Token } from '@auth/domain/entity/token.entity';
import { BasicLogoutCommand } from '@auth/application/port/in/commands/basic-logout.command';
import { ErrorHandlingStrategy } from '@libs/exception';

@CommandHandler(BasicLogoutCommand)
export class BasicLogoutHandler implements ICommandHandler {
  constructor(private readonly tokenService: TokenService) {}
  async execute(command: BasicLogoutCommand): Promise<Token> {
    try {
      return await this.tokenService.revokeTokenByRefreshToken({
        refreshToken: command.refreshToken,
      });
    } catch (error) {
      console.log(error);
      ErrorHandlingStrategy.handleError(error);
    }
  }
}
