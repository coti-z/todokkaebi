import { CreateCategoryHandler } from '@/todo/application/commands/handlers/create-category.handler';
import { CreateProjectHandler } from '@/todo/application/commands/handlers/create-project.handler';
import { DeleteCategoryHandler } from '@/todo/application/commands/handlers/delete-category.handler';
import { DeleteProjectHandler } from '@/todo/application/commands/handlers/delete-project.handler';
import { UpdateCategoryHandler } from '@/todo/application/commands/handlers/update-category.handler';
import { UpdateProjectHandler } from '@/todo/application/commands/handlers/update-project.handler';
import { GetAllCategoriesQuery } from '@/todo/application/queries/get-all-category.query';
import { GetAllCategoryHandler } from '@/todo/application/queries/handlers/get-all-category.handler';
import { GetAllProjectsHandler } from '@/todo/application/queries/handlers/get-all-projects.handler';
import { GetCategoryHandler } from '@/todo/application/queries/handlers/get-category.handler';
import { GetProjectHandler } from '@/todo/application/queries/handlers/get-project.handler';
import { CategoryService } from '@/todo/application/services/category.service';
import { ProjectService } from '@/todo/application/services/project.serivce';
import { DatabaseModule } from '@/todo/infrastructure/database/database.module';
import { CategoryRepository } from '@/todo/infrastructure/database/repository/category.repository';
import { ProjectRepository } from '@/todo/infrastructure/database/repository/project.repository';
import { CategoryResolver } from '@/todo/presentation/resolvers/category.resolver';
import { ProjectResolver } from '@/todo/presentation/resolvers/project.resolver';
import { JwtTokenModule } from '@/utils/jwt/jwt.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [JwtTokenModule, DatabaseModule, CqrsModule],
  providers: [
    ProjectResolver,
    CategoryResolver,

    CreateProjectHandler,
    DeleteProjectHandler,
    UpdateProjectHandler,
    GetProjectHandler,
    GetAllProjectsHandler,

    DeleteCategoryHandler,
    CreateCategoryHandler,
    GetAllCategoryHandler,
    GetCategoryHandler,
    UpdateCategoryHandler,

    CategoryService,
    ProjectService,

    ProjectRepository,
    CategoryRepository,
  ],
})
export class TodoModule {}
