import { LoginInput } from '@auth/presentation/resolver/dto/input/login.input';
import { LogoutInput } from '@auth/presentation/resolver/dto/input/logout.input';
import { Token } from '@auth/domain/entity/token.entity';
import { LoginOutput } from '@auth/presentation/resolver/dto/output/login.output';
import { LogoutOutput } from '@auth/presentation/resolver/dto/output/logout.output';
import { BasicLogoutCommand } from '@auth/application/port/in/commands/basic-logout.command';
import { BasicLoginCommand } from '@auth/application/port/in/commands/basic-login.command';

export class BasicAuthPresentationMapper {
  static toBasicLogoutCommand(input: LogoutInput): BasicLogoutCommand {
    return new BasicLogoutCommand(input.refreshToken);
  }

  static toBasicLoginCommand(input: LoginInput): BasicLoginCommand {
    return new BasicLoginCommand(input.email, input.password);
  }

  static resultToLoginOutput(result: Token): LoginOutput {
    return {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      userId: result.userId,
    };
  }

  static resultToLogoutOutput(result: Token): LogoutOutput {
    return {
      userId: result.userId,
    };
  }
}
