import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateCategoryHandler } from '@project/application/command/category/handler/create-category.handler';
import { DeleteCategoryHandler } from '@project/application/command/category/handler/delete-category.handler';
import { CreateProjectHandler } from '@project/application/command/unit-project/handler/create-project.handler';
import { DeleteProjectHandler } from '@project/application/command/unit-project/handler/delete-project.handler';
import { UpdateProjectHandler } from '@project/application/command/unit-project/handler/update-project.handler';
import { ProjectByIdQueryHandler } from '@project/application/query/handler/project-by-id-query.handler';
import { CategoryService } from '@project/application/service/category.service';
import { ProjectService } from '@project/application/service/project.service';
import { ProjectInfrastructureModule } from '@project/infrastructure/project.infastructure.module';
import { UpdateCategoryHandler } from './command/category/handler/update-category.handler';
import { CreateTaskHandler } from './command/task/handler/create-task.handler';
import { CategoryByIdHandler } from './query/handler/category-by-id-query.handler';
import { ProjectsByUserIdQueryHandler } from './query/handler/projects-by-userid-query.handler';
import { TaskService } from './service/task.service';
import { TaskByIdQueryHadnler } from './query/handler/task-by-id-query.handler';
import { TasksByCategoryIdQueryHandler } from './query/handler/task-by-categoryid-query.handler';
import { UpdateTaskCommandHandler } from './command/task/handler/update-task-command.handler';

@Module({
  imports: [CqrsModule, ProjectInfrastructureModule],
  providers: [
    CreateProjectHandler,
    DeleteProjectHandler,
    UpdateProjectHandler,
    ProjectByIdQueryHandler,
    ProjectsByUserIdQueryHandler,
    DeleteCategoryHandler,
    CreateCategoryHandler,
    UpdateCategoryHandler,
    CategoryByIdHandler,
    CreateTaskHandler,
    UpdateTaskCommandHandler,
    TaskByIdQueryHadnler,
    TasksByCategoryIdQueryHandler,
    ProjectService,
    CategoryService,
    TaskService,
  ],
  exports: [],
})
export class ProjectApplicationModule {}
