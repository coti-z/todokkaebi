import { Module } from '@nestjs/common';
import { BasicAuthResolver } from '@auth/presentation/resolver/basic-auth.resolver';
import { TokenResolver } from '@auth/presentation/resolver/token.resolver';
import { AuthGrpcController } from '@auth/presentation/controller/grpc/auth-grpc.controller';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  providers: [BasicAuthResolver, TokenResolver, AuthGrpcController],
  exports: [BasicAuthResolver, TokenResolver, AuthGrpcController],
})
export class AuthPresentationModule {}
