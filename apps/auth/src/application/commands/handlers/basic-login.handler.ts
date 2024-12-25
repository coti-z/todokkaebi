import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BasicLoginCommand } from '@auth/application/commands/basic-login.command';
import { TokenService } from '@auth/application/services/token.service';
import { UserAuthService } from '@auth/application/services/user-auth.service';
import {
  BaseBusinessException,
  ErrorCode,
  errorFactory,
} from '@libs/exception';
import { LoginOutput } from '@auth/presentation/resolver/dto/output/login.output';

@CommandHandler(BasicLoginCommand)
export class BasicLoginHandler implements ICommandHandler {
  constructor(
    private readonly userAuthService: UserAuthService,
    private readonly tokenService: TokenService,
  ) {}
  async execute(command: BasicLoginCommand): Promise<LoginOutput> {
    try {
      const credential = await this.userAuthService.validatePassword({
        email: command.email,
        password: command.password,
      });
      const token = await this.tokenService.createToken({
        userId: credential.userId,
      });
      return {
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        id: token.userId,
      };
    } catch (err) {
      if (err instanceof BaseBusinessException) {
        throw errorFactory(err.errorCode);
      }
      throw errorFactory(ErrorCode.INTERNAL_SERVER_ERROR, err.messages);
    }
  }
}
