import { Module } from '@nestjs/common';
import { ProjectResolver } from '@project/presentation/resolver/project.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import { CategoryResolver } from '@project/presentation/resolver/category.resolver';
import { ProjectApplicationModule } from '@project/application/project.application.module';

@Module({
  imports: [CqrsModule, ProjectApplicationModule],
  providers: [ProjectResolver, CategoryResolver],
  exports: [ProjectResolver, CategoryResolver],
})
export class ProjectPresentationModule {}
