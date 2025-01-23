import { Module } from '@nestjs/common';
import { ProjectInfrastructureModule } from '@project/infrastructure/project.infastructure.module';
import { CreateProjectHandler } from '@project/application/command/unit-project/handler/create-project.handler';
import { ProjectService } from '@project/application/service/project.service';
import { CqrsModule } from '@nestjs/cqrs';
import { DeleteProjectHandler } from '@project/application/command/unit-project/handler/delete-project.handler';
import { UpdateProjectHandler } from '@project/application/command/unit-project/handler/update-project.handler';
import { CreateCategoryHandler } from '@project/application/command/category/handler/create-category.handler';
import { ProjectByIdQueryHandler } from '@project/application/query/handler/project-by-id-query.handler';
import { projectsByUserIdQueryHandler } from '@project/application/query/handler/projects-by-userid-query.handler';
import { CategoryService } from '@project/application/service/category.service';
import { DeleteCategoryHandler } from '@project/application/command/category/handler/delete-category.handler';

@Module({
  imports: [CqrsModule, ProjectInfrastructureModule],
  providers: [
    CreateProjectHandler,
    DeleteProjectHandler,
    UpdateProjectHandler,
    ProjectByIdQueryHandler,
    projectsByUserIdQueryHandler,
    DeleteCategoryHandler,
    CreateCategoryHandler,
    ProjectService,
    CategoryService,
  ],
  exports: [ProjectService],
})
export class ProjectApplicationModule {}
