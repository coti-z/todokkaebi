import { CreateUserCommand } from '@/auth/application/commands/create-user.command';
import { UserAuthService } from '@/auth/application/services/user-auth.service';
import { TokenPair } from '@/auth/presentation/resolver/dto/object/token-pair.object';
import { JwtTokenService } from '@/utils/jwt/jwt.service';
import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

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
