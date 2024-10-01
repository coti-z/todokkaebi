import { DatabaseModule } from '@/todo/infrastructure/database/database.module';
import { ProjectResolver } from '@/todo/presentation/resolvers/project.resolver';
import { JwtTokenModule } from '@/utils/jwt/jwt.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [JwtTokenModule, DatabaseModule, CqrsModule],
  providers: [ProjectResolver],
})
export class TodoModule {}
