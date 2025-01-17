import { Module } from '@nestjs/common';
import { ProjectResolver } from '@project/presentation/resolver/project/project.resolver';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  providers: [ProjectResolver],
  exports: [ProjectResolver],
})
export class ProjectPresentationModule {}
