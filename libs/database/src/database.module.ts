import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { BaseRepository } from 'libs/database/src/repository/base.repository';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
