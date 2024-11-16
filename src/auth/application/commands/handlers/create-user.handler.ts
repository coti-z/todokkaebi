import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtTokenService, TokenPair } from '@libs/jwt';
import { UserAuthService } from '@src/auth/application/services/user-auth.service';
import { CreateUserCommand } from '@src/auth/application/commands/create-user.command';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly jwtTokenService: JwtTokenService,
    private readonly userAuthService: UserAuthService,
  ) {}

  async execute(command: CreateUserCommand): Promise<TokenPair> {
    try {
      const user = await this.userAuthService.createUser(command);
      return this.jwtTokenService.generateTokenPair({
        userId: user.id,
      });
    } catch (e) {
      throw e;
    }
  }
}
