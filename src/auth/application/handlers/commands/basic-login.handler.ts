import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TokenService } from '@auth/application/services/token.service';

import { Token } from '@auth/domain/entity/token.entity';
import { UserCredentialService } from '@auth/application/services/user-credential.service';
import { BasicLoginCommand } from '@auth/application/port/in/commands/basic-login.command';
import { ErrorHandlingStrategy } from '@libs/exception';
@CommandHandler(BasicLoginCommand)
export class BasicLoginHandler implements ICommandHandler {
  constructor(
    private readonly userAuthService: UserCredentialService,
    private readonly tokenService: TokenService,
  ) {}
  async execute(command: BasicLoginCommand): Promise<Token> {
    try {
      const credential = await this.userAuthService.validatePassword({
        email: command.email,
        password: command.password,
      });
      return await this.tokenService.createToken({
        userId: credential.userId,
      });
    } catch (error) {
      ErrorHandlingStrategy.handleError(error);
    }
  }
}
