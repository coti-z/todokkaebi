import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { JwtTokenModule } from '@libs/jwt';
import { RedisModule } from '@libs/redis';

import { AuthModule } from '@auth/auth.module';

import { CategoryResolver } from '@project/presentation/resolver/category.resolver';
import { ProjectResolver } from '@project/presentation/resolver/project.resolver';

import { ProjectInvitationResolver } from './resolver/project-invitation.resolver';
import { TaskResolver } from './resolver/task.resolver';

@Module({
  imports: [CqrsModule, JwtTokenModule, AuthModule, RedisModule],
  providers: [
    ProjectResolver,
    CategoryResolver,
    TaskResolver,
    ProjectInvitationResolver,
  ],
  exports: [
    ProjectResolver,
    CategoryResolver,
    TaskResolver,
    ProjectInvitationResolver,
  ],
})
export class ProjectPresentationModule {}
