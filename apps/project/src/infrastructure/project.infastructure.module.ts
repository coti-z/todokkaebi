import { Module } from '@nestjs/common';
import { ProjectRepositorySymbol } from '@project/application/port/out/project-repository.port';
import { ProjectRepositoryImpl } from '@project/infrastructure/persistence/rdbms/project.repository';
import { CategoryRepositoryImpl } from '@project/infrastructure/persistence/rdbms/category.repository';
import { CategoryRepositorySymbol } from '@project/application/port/out/category-repository.port';
import { DatabaseModule } from '@libs/database';
import { TaskRepositoryImpl } from './persistence/rdbms/task.repository';
import { TaskRepositorySymbol } from '@project/application/port/out/task-repository.port';
import { ProjectInvitationRepositorySymbol } from '@project/application/port/project-invitation-repository.port';
import { ProjectInvitationRepositoryImpl } from './persistence/rdbms/project-invitation.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: ProjectRepositorySymbol,
      useClass: ProjectRepositoryImpl,
    },
    {
      provide: CategoryRepositorySymbol,
      useClass: CategoryRepositoryImpl,
    },
    {
      provide: TaskRepositorySymbol,
      useClass: TaskRepositoryImpl,
    },
    {
      provide: ProjectInvitationRepositorySymbol,
      useClass: ProjectInvitationRepositoryImpl,
    },
  ],

  exports: [
    ProjectRepositorySymbol,
    CategoryRepositorySymbol,
    TaskRepositorySymbol,
    ProjectInvitationRepositorySymbol,
  ],
})
export class ProjectInfrastructureModule {}
