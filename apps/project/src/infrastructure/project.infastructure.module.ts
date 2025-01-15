import { Module } from '@nestjs/common';
import { DatabaseModule } from '@libs/database';
import { ProjectRepositorySymbol } from '@project/application/port/out/project-repository.port';
import { ProjectRepositoryImpl } from '@project/infrastructure/persistence/rdbms/project.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: ProjectRepositorySymbol,
      useClass: ProjectRepositoryImpl,
    },
  ],

  exports: [ProjectRepositorySymbol],
})
export class ProjectInfrastructureModule {}
