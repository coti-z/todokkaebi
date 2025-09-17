export class TransactionContext {
  private readonly _id = Symbol('transaction');
  constructor(private readonly context: unknown) {}
  getClient<T>(): T {
    return this.context as T;
  }
}

export interface ITransactionManager {
  executeInTransaction<T>(
    operation: (context: TransactionContext) => Promise<T>,
  ): Promise<T>;
}

export const TransactionManagerSymbol = Symbol('TransactionManager');
