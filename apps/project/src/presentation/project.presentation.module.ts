import { Module } from '@nestjs/common';
import { ProjectResolver } from '@project/presentation/resolver/project/project.resolver';
import { ProjectApplicationModule } from '@project/application/project.application.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule, ProjectApplicationModule],
  providers: [ProjectResolver],
  exports: [ProjectResolver],
})
export class ProjectPresentationModule {}
