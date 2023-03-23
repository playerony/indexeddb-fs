import { initializeDatabase } from '@database';

import { IInitializeObjectStoreDecoratorProps } from './initialize-object-store-decorator.types';

export const initializeObjectStoreDecorator =
  ({ databaseName, databaseVersion, objectStoreName }: IInitializeObjectStoreDecoratorProps) =>
  async (type: IDBTransactionMode): Promise<IDBObjectStore> => {
    const database = await initializeDatabase({
      databaseName,
      databaseVersion,
      objectStoreName,
    });

    const transaction = database.transaction(objectStoreName, type);

    return transaction.objectStore(objectStoreName);
  };
