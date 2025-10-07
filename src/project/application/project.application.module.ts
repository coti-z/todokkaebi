import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import {
  DatabaseModule,
  PrismaTransactionManager,
  TransactionManagerSymbol,
} from '@libs/database';
import { DecoratorsModule } from '@libs/decorators/decorators.module';
import { ErrorHandlingStrategy } from '@libs/exception';
import { RedisModule } from '@libs/redis';

import { ChangeCategoryNameHandler } from '@project/application/handler/command/category/change-category-name.handler';
import { CreateCategoryHandler } from '@project/application/handler/command/category/create-category.handler';
import { DeleteCategoryHandler } from '@project/application/handler/command/category/delete-category.handler';
import { CreateProjectInvitationCommandHandler } from '@project/application/handler/command/project-invitation/create-project-invitation-command.handler';
import { UpdateProjectInvitationCommandHandler } from '@project/application/handler/command/project-invitation/update-project-invitation-command.handler';
import { CreateTaskHandler } from '@project/application/handler/command/task/create-task.handler';
import { DeleteTaskCommandHandler } from '@project/application/handler/command/task/delete-task-command.handler';
import { UpdateTaskCommandHandler } from '@project/application/handler/command/task/update-task-command.handler';
import { CreateProjectHandler } from '@project/application/handler/command/unit-project/create-project.handler';
import { DeleteProjectHandler } from '@project/application/handler/command/unit-project/delete-project.handler';
import { UpdateProjectHandler } from '@project/application/handler/command/unit-project/update-project.handler';
import { CategoryByIdHandler } from '@project/application/handler/query/category-by-id-query.handler';
import { ProjectByIdQueryHandler } from '@project/application/handler/query/project-by-id-query.handler';
import { ProjectsByUserIdQueryHandler } from '@project/application/handler/query/projects-by-userid-query.handler';
import { TaskByIdQueryHandler } from '@project/application/handler/query/task-by-id-query.handler';
import { TasksByCategoryIdQueryHandler } from '@project/application/handler/query/tasks-by-category-id-query.handler';
import { CategoryService } from '@project/application/service/category.service';
import { ProjectInvitationService } from '@project/application/service/project-invitation.service';
import { ProjectMembershipService } from '@project/application/service/project-membership.service';
import { ProjectService } from '@project/application/service/project.service';
import { TaskService } from '@project/application/service/task.service';
import { ProjectInfrastructureModule } from '@project/infrastructure/project.infrastructure.module';

@Module({
  imports: [
    CqrsModule,
    ProjectInfrastructureModule,
    DatabaseModule,
    RedisModule,
    DecoratorsModule,
  ],
  providers: [
    ErrorHandlingStrategy,
    CreateProjectHandler,
    CreateCategoryHandler,
    CreateTaskHandler,
    CreateProjectInvitationCommandHandler,

    UpdateProjectHandler,
    UpdateTaskCommandHandler,
    ChangeCategoryNameHandler,
    UpdateProjectInvitationCommandHandler,

    DeleteCategoryHandler,
    DeleteTaskCommandHandler,
    DeleteProjectHandler,

    CategoryByIdHandler,
    ProjectByIdQueryHandler,
    ProjectsByUserIdQueryHandler,
    TasksByCategoryIdQueryHandler,
    ProjectInvitationService,
    TaskByIdQueryHandler,
    ProjectMembershipService,
    ProjectService,
    CategoryService,
    TaskService,

    {
      provide: TransactionManagerSymbol,
      useClass: PrismaTransactionManager,
    },
  ],
  exports: [],
})
export class ProjectApplicationModule {}
