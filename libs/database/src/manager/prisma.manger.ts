import { Injectable } from '@nestjs/common';

import {
  ITransactionManager,
  TransactionContext,
  PrismaService,
} from '@libs/database';

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
