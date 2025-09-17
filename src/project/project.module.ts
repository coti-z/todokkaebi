import { Module } from '@nestjs/common';
import { ProjectPresentationModule } from './presentation/project.presentation.module';
import { LoggerModule } from '@libs/logger';
import { ProjectApplicationModule } from '@project/application/project.application.module';

@Module({
  imports: [ProjectPresentationModule, ProjectApplicationModule, LoggerModule],
})
export class ProjectModule {}
