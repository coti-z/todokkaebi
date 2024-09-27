import { KakaoAuthHandler } from '@/auth/application/commands/handlers/kakao-auth.handler';
import { KakaoLoginUrlHandler } from '@/auth/application/queries/handlers/kakao-login-url.handler';
import { KakaoAuthService } from '@/auth/application/services/kakao-auth.service';
import { DatabaseModule } from '@/auth/infrastructure/database/database.module';
import { UserRepository } from '@/auth/infrastructure/database/repository/user.repository';
import { KakaoModule } from '@/auth/infrastructure/kakao/kakao.moduel';
import { KakaoAuthResolver } from '@/auth/presentation/resolver/kakao-auth.resolver';
import { JwtTokenModule } from '@/utils/jwt/jwt.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [JwtTokenModule, DatabaseModule, KakaoModule, CqrsModule],
  providers: [
    KakaoAuthResolver,
    KakaoLoginUrlHandler,
    KakaoAuthHandler,
    KakaoAuthService,
    UserRepository,
  ],
})
export class AuthModule {}
