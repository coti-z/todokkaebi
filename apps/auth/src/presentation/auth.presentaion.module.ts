import { Module } from '@nestjs/common';
import { BasicAuthResolver } from '@auth/presentation/resolver/basic-auth.resolver';
import { TokenResolver } from '@auth/presentation/resolver/token.resolver';
import { AuthGrpcController } from '@auth/presentation/controller/grpc/auth-grpc.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { UserAuthService } from '@auth/application/services/user-auth.service';
import { AuthInfrastructureModule } from '@auth/infrastructure/auth.infrastructure.module';

@Module({
  imports: [CqrsModule, AuthInfrastructureModule],
  providers: [
    BasicAuthResolver,
    TokenResolver,
    AuthGrpcController,
    UserAuthService,
  ],
  exports: [
    BasicAuthResolver,
    TokenResolver,
    AuthGrpcController,
    UserAuthService,
  ],
})
export class AuthPresentationModule {}
