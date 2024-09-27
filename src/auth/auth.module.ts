import { DatabaseModule } from '@/auth/infrastructure/database/database.module';
import { KakaoModule } from '@/auth/infrastructure/kakao/kakao.moduel';
import { KakaoAuthResolver } from '@/auth/presentation/resolver/kakao-auth.resolver';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule, KakaoModule],
  providers: [KakaoAuthResolver],
})
export class AuthModule {}
