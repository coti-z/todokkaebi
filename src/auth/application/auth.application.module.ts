import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { TokenService } from '@auth/application/services/token.service';
import { AuthInfrastructureModule } from '@auth/infrastructure/auth.infrastructure.module';
import { UserCredentialService } from '@auth/application/services/user-credential.service';
import { BasicLoginHandler } from '@auth/application/handlers/commands/basic-login.handler';
import { ReissueTokenHandler } from '@auth/application/handlers/commands/reissue-token.handler';
import { JwtTokenModule } from '@libs/jwt';
import { BasicLogoutHandler } from '@auth/application/handlers/commands/basic-logout.handler';

@Module({
  imports: [CqrsModule, JwtTokenModule, AuthInfrastructureModule],
  providers: [
    BasicLoginHandler,
    BasicLogoutHandler,
    ReissueTokenHandler,
    UserCredentialService,
    TokenService,
  ],
  exports: [
    BasicLoginHandler,
    BasicLogoutHandler,
    ReissueTokenHandler,
    UserCredentialService,
    TokenService,
  ],
})
export class AuthApplicationModule {}
