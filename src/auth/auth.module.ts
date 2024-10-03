import { CreateUserHandler } from '@/auth/application/commands/handlers/create-user.handler';
import { DeleteUserHandler } from '@/auth/application/commands/handlers/delete-user.handler';
import { KakaoAuthHandler } from '@/auth/application/commands/handlers/kakao-auth.handler';
import { ReissueAccessTokenHandler } from '@/auth/application/commands/handlers/reissue-access-token.handler';
import { UpdateUserInfoHandler } from '@/auth/application/commands/handlers/update-user-info.handler';
import { GetUserInfoHandler } from '@/auth/application/queries/handlers/get-user-info.handler';
import { KakaoLoginUrlHandler } from '@/auth/application/queries/handlers/kakao-login-url.handler';
import { KakaoAuthService } from '@/auth/application/services/kakao-auth.service';
import { UserAuthService } from '@/auth/application/services/user-auth.service';
import { DatabaseModule } from '@/auth/infrastructure/database/database.module';
import { UserRepository } from '@/auth/infrastructure/database/repository/user.repository';
import { KakaoModule } from '@/auth/infrastructure/kakao/kakao.moduel';
import { KakaoAuthResolver } from '@/auth/presentation/resolver/kakao-auth.resolver';
import { UserAuthResolver } from '@/auth/presentation/resolver/user-auth.resolver';
import { JwtTokenModule } from '@/utils/jwt/jwt.module';
import { TaskUpdateScheduler } from '@/utils/schedulers/task-update.scheduler';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [JwtTokenModule, DatabaseModule, KakaoModule, CqrsModule],
  providers: [
    UserAuthResolver,
    KakaoAuthResolver,

    KakaoLoginUrlHandler,
    KakaoAuthHandler,
    CreateUserHandler,
    UpdateUserInfoHandler,
    GetUserInfoHandler,
    DeleteUserHandler,
    ReissueAccessTokenHandler,

    KakaoAuthService,
    UserAuthService,

    UserRepository,
  ],
})
export class AuthModule {}
