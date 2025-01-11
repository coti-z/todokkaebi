import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BasicLoginHandler } from '@auth/application/commands/handlers/basic-login.handler';
import { BasicLogoutCommand } from '@auth/application/commands/basic-logout.command';
import { ReissueTokenHandler } from '@auth/application/commands/handlers/reissue-token.handler';
import { UserAuthService } from '@auth/application/services/user-auth.service';
import { TokenService } from '@auth/application/services/token.service';
import { AuthInfrastructureModule } from '@auth/infrastructure/auth.infrastructure.module';
import { JwtTokenModule } from '@libs/jwt';

@Module({
  imports: [CqrsModule, JwtTokenModule, AuthInfrastructureModule],
  providers: [
    BasicLoginHandler,
    BasicLogoutCommand,
    ReissueTokenHandler,
    UserAuthService,
    TokenService,
  ],
  exports: [
    BasicLoginHandler,
    BasicLogoutCommand,
    ReissueTokenHandler,
    UserAuthService,
    TokenService,
  ],
})
export class AuthApplicationModule {}
