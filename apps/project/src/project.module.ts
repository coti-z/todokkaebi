import { Module } from '@nestjs/common';
import { ProjectApplicationModule } from './application/project.application.module';
import { ProjectPresentationModule } from './presentation/project.presentation.module';
import { ProjectInfrastructureModule } from './infrastructure/project.infastructure.module';

@Module({
  imports: [
    ProjectPresentationModule,
    ProjectApplicationModule,
    ProjectInfrastructureModule,
  ],
  controllers: [],
  providers: [],
})
export class ProjectModule {}
