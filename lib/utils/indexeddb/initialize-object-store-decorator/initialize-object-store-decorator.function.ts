import { initializeDatabase } from '@utils';

import { InitializeObjectStoreDecoratorProps } from './initialize-object-store-decorator.types';

export const initializeObjectStoreDecorator =
  ({ databaseName, databaseVersion, objectStoreName }: InitializeObjectStoreDecoratorProps) =>
  async (type: IDBTransactionMode): Promise<IDBObjectStore> => {
    const database = await initializeDatabase({
      databaseName,
      databaseVersion,
      objectStoreName,
    });

    const transaction = database.transaction(objectStoreName, type);
    return transaction.objectStore(objectStoreName);
  };
