import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  ITransactionManager,
  Transactional,
  TransactionManagerSymbol,
} from '@libs/database';
import { Lock } from '@libs/decorators';
import { ErrorHandlingStrategy } from '@libs/exception';

import { BasicLoginCommand } from '@auth/application/port/in/commands/basic-login.command';
import { PASSWORD_HASHER_OUTBOUND_PORT } from '@auth/application/port/out/password-hasher.port';
import { TokenByJWTService } from '@auth/application/service/token-by-jwt.service';
import { TokenService } from '@auth/application/service/token.service';
import { UserCredentialService } from '@auth/application/service/user-credential.service';
import { Token } from '@auth/domain/entity/token.entity';
import { PasswordPolicy } from '@auth/domain/policy/password-policy';
import { BcryptPasswordHasherAdapter } from '@auth/infrastructure/adapter/password-hasher.adapter';
@Injectable()
@CommandHandler(BasicLoginCommand)
export class BasicLoginHandler implements ICommandHandler {
  constructor(
    private readonly userAuthService: UserCredentialService,
    private readonly tokenService: TokenService,
    private readonly tokenByJwtService: TokenByJWTService,
    private readonly errorHandlingStrategy: ErrorHandlingStrategy,

    @Inject(TransactionManagerSymbol)
    private readonly transactionManager: ITransactionManager,

    @Inject(PASSWORD_HASHER_OUTBOUND_PORT)
    private passwordHasher: BcryptPasswordHasherAdapter,
  ) {}

  @Lock({
    key: args => `login-user:${args[0].email}`,
    ttl: 5000,
    timeout: 3000,
  })
  @Transactional()
  async execute(command: BasicLoginCommand): Promise<Token> {
    try {
      await this.authorize(command.email, command.password);
      return await this.process(command);
    } catch (error) {
      this.errorHandlingStrategy.handleError(error, command.context);
    }
  }

  async authorize(email: string, password: string): Promise<void> {
    const credential = await this.userAuthService.findCredentialByEmail({
      email,
    });
    const result = await this.passwordHasher.compare(
      password,
      credential.passwordHash,
    );
    PasswordPolicy.validateSamePassword(result);
  }

  async process(command: BasicLoginCommand): Promise<Token> {
    const credential = await this.userAuthService.findCredentialByEmail({
      email: command.email,
    });
    const pairToken = await this.tokenByJwtService.generatePairToken({
      userId: credential.userId,
    });
    return this.tokenService.storeToken({
      accessToken: pairToken.accessToken,
      refreshToken: pairToken.refreshToken,
      refreshTokenExpiresAt: pairToken.refreshTokenExpires,
      userId: credential.userId,
    });
  }
}
