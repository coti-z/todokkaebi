import { Module } from '@nestjs/common';
import { DatabaseModule } from '@libs/database';
import { ProjectRepositorySymbol } from '@project/application/port/out/project-repository.port';
import { ProjectRepositoryImpl } from '@project/infrastructure/persistence/rdbms/project.repository';
import { CategoryRepositoryImpl } from '@project/infrastructure/persistence/rdbms/category.repository';
import { CategoryRepositorySymbol } from '@project/application/port/out/category-repository.port';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: ProjectRepositorySymbol,
      useClass: ProjectRepositoryImpl,
    },
    {
      provide: CategoryRepositorySymbol,
      useClass: CategoryRepositoryImpl,
    },
  ],

  exports: [ProjectRepositorySymbol, CategoryRepositorySymbol],
})
export class ProjectInfrastructureModule {}
