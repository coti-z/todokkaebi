import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateCategoryHandler } from '@project/application/command/category/handler/create-category.handler';
import { DeleteCategoryHandler } from '@project/application/command/category/handler/delete-category.handler';
import { CreateProjectHandler } from '@project/application/command/unit-project/handler/create-project.handler';
import { DeleteProjectHandler } from '@project/application/command/unit-project/handler/delete-project.handler';
import { UpdateProjectHandler } from '@project/application/command/unit-project/handler/update-project.handler';
import { ProjectByIdQueryHandler } from '@project/application/query/handler/project-by-id-query.handler';
import { projectsByUserIdQueryHandler } from '@project/application/query/handler/projects-by-userid-query.handler';
import { CategoryService } from '@project/application/service/category.service';
import { ProjectService } from '@project/application/service/project.service';
import { ProjectInfrastructureModule } from '@project/infrastructure/project.infastructure.module';
import { UpdateCategoryHandler } from './command/category/handler/update-category.handler';
import { CategoryByIdHandler } from './query/handler/category-by-id.handler';

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
    UpdateCategoryHandler,
    CategoryByIdHandler,
    ProjectService,
    CategoryService,
  ],
  exports: [ProjectService],
})
export class ProjectApplicationModule {}
