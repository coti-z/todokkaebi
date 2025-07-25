import { TransactionContextStorage } from '@libs/database';
import { PrismaService } from '@libs/database';
import { Injectable } from '@nestjs/common';
import { PrismaTransactionClient } from 'libs/database/src/types/client.type';

@Injectable()
export abstract class BaseRepository {
  constructor(protected readonly prisma: PrismaService) {}

  protected getPrismaClient(): PrismaTransactionClient | PrismaService {
    const context = TransactionContextStorage.getContext();
    return context?.getClient<PrismaTransactionClient>() || this.prisma;
  }
}
