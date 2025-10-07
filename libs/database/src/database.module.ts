import { Module } from '@nestjs/common';

import { BaseRepository } from 'libs/database/src/repository/base.repository';

import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
