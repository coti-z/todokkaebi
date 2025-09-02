import {
  DatabaseModule,
  PrismaTransactionManager,
  TransactionManagerSymbol,
} from '@libs/database';
import { ErrorHandlingStrategy } from '@libs/exception';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ChangeCategoryNameHandler } from '@project/application/handler/category/change-category-name.handler';
import { CreateCategoryHandler } from '@project/application/handler/category/create-category.handler';
import { DeleteCategoryHandler } from '@project/application/handler/category/delete-category.handler';
import { AcceptProjectInvitationCommandHandler } from '@project/application/handler/project-invitation/accept-project-invitation-command.handler';
import { CreateProjectInvitationCommandHandler } from '@project/application/handler/project-invitation/create-project-invitation-command.handler';
import { RejectProjectInvitationCommandHandler } from '@project/application/handler/project-invitation/reject-project-invitation-command.handler';
import { UpdateProjectInvitationCommandHandler } from '@project/application/handler/project-invitation/update-project-invitation-command.handler';
import { CreateTaskHandler } from '@project/application/handler/task/create-task.handler';
import { DeleteTaskCommandHandler } from '@project/application/handler/task/delete-task-command.hanler';
import { UpdateTaskCommandHandler } from '@project/application/handler/task/update-task-command.handler';
import { CreateProjectHandler } from '@project/application/handler/unit-project/create-project.handler';
import { DeleteProjectHandler } from '@project/application/handler/unit-project/delete-project.handler';
import { UpdateProjectHandler } from '@project/application/handler/unit-project/update-project.handler';
import { CategoryByIdHandler } from '@project/application/query/handler/category-by-id-query.handler';
import { ProjectByIdQueryHandler } from '@project/application/query/handler/project-by-id-query.handler';
import { ProjectsByUserIdQueryHandler } from '@project/application/query/handler/projects-by-userid-query.handler';
import { TasksByCategoryIdQueryHandler } from '@project/application/query/handler/task-by-categoryid-query.handler';
import { TaskByIdQueryHandler } from '@project/application/query/handler/task-by-id-query.handler';
import { CategoryService } from '@project/application/service/category.service';
import { ProjectInvitationService } from '@project/application/service/project-invitation.service';
import { ProjectMembershipService } from '@project/application/service/project-membership.service';
import { ProjectService } from '@project/application/service/project.service';
import { TaskService } from '@project/application/service/task.service';
import { ProjectInfrastructureModule } from '@project/infrastructure/project.infastructure.module';

@Module({
  imports: [CqrsModule, ProjectInfrastructureModule, DatabaseModule],
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

    RejectProjectInvitationCommandHandler,
    AcceptProjectInvitationCommandHandler,

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
