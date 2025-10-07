import { Module } from '@nestjs/common';

import { LoggerModule } from '@libs/logger';

import { ProjectApplicationModule } from '@project/application/project.application.module';

import { ProjectPresentationModule } from './presentation/project.presentation.module';

@Module({
  imports: [ProjectPresentationModule, ProjectApplicationModule, LoggerModule],
})
export class ProjectModule {}
