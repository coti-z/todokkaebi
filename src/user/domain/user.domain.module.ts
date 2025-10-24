import { Module } from '@nestjs/common';

import { UserDomainService } from '@user/domain/service/user.domain.service';
import { UserInfrastructureModule } from '@user/infrastructure/user.infrastructure.module';

@Module({
  imports: [UserInfrastructureModule],
  providers: [UserDomainService],
  exports: [UserDomainService],
})
export class UserDomainModule {}
