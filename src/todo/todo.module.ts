import { CreateProjectHandler } from '@/todo/application/commands/handlers/create-project.handler';
import { DeleteProjectHandler } from '@/todo/application/commands/handlers/delete-project.handler';
import { UpdateProjectHandler } from '@/todo/application/commands/handlers/update-project.handler';
import { GetAllProjectsHandler } from '@/todo/application/queries/handlers/get-all-projects.handler';
import { GetProjectHandler } from '@/todo/application/queries/handlers/get-project.handler';
import { ProjectService } from '@/todo/application/services/project.serivce';
import { DatabaseModule } from '@/todo/infrastructure/database/database.module';
import { ProjectRepository } from '@/todo/infrastructure/database/repository/project.repository';
import { ProjectResolver } from '@/todo/presentation/resolvers/project.resolver';
import { JwtTokenModule } from '@/utils/jwt/jwt.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [JwtTokenModule, DatabaseModule, CqrsModule],
  providers: [
    ProjectResolver,

    CreateProjectHandler,
    DeleteProjectHandler,
    UpdateProjectHandler,
    GetProjectHandler,
    GetAllProjectsHandler,

    ProjectService,
    ProjectRepository,
  ],
})
export class TodoModule {}
