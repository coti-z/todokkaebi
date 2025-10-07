import { AsyncLocalStorage } from 'async_hooks';

import { TransactionContext } from '@libs/database';

export class TransactionContextStorage {
  private static storage = new AsyncLocalStorage<TransactionContext>();

  static run<T>(
    context: TransactionContext,
    callback: () => Promise<T>,
  ): Promise<T> {
    return this.storage.run(context, callback);
  }

  static getContext(): TransactionContext | undefined {
    return this.storage.getStore();
  }
}
