import { Module } from '@nestjs/common';
import { ProjectInfrastructureModule } from '@project/infrastructure/project.infastructure.module';
import { CreateProjectHandler } from '@project/application/command/handler/create-project.handler';
import { ProjectService } from '@project/application/service/project.service';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule, ProjectInfrastructureModule],
  providers: [CreateProjectHandler, ProjectService],
  exports: [CreateProjectHandler, ProjectService],
})
export class ProjectApplicationModule {}
