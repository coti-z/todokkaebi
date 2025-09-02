import { TransactionContextStorage } from '@libs/database';
import { ITransactionManager, TransactionContext } from '@libs/database';

export function Transactional() {
  return function (
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value as Function;

    descriptor.value = async function (
      this: { transactionManager: ITransactionManager },
      ...args: any[]
    ) {
      if (TransactionContextStorage.getContext()) {
        return await originalMethod.apply(this, args);
      }

      if (!this.transactionManager) {
        throw new Error(
          'TransactionManager가 주입되지 않았습니다. Dependency Inject(DI)를 확인하세요',
        );
      }

      return await this.transactionManager.executeInTransaction(
        async (context: TransactionContext) => {
          return await TransactionContextStorage.run(context, async () => {
            // 오타 수정: this.args -> args
            return await originalMethod.apply(this, args);
          });
        },
      );
    };
  };
}
