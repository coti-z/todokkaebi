import { ITransactionManager, TransactionContext } from '@libs/database';
import { PrismaService } from '@libs/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaTransactionManager implements ITransactionManager {
  constructor(private readonly prisma: PrismaService) {}
  async executeInTransaction<T>(
    operation: (token: TransactionContext) => Promise<T>,
  ): Promise<T> {
    return await this.prisma.$transaction(async prismaTx => {
      const token = new TransactionContext(prismaTx);
      return await operation(token);
    });
  }
}
