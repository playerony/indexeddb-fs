import { initializeDatabase } from '@database';

import { IInitializeObjectStoreInstanceProps } from './initialize-object-store-instance.types';

export const initializeObjectStoreInstance =
  ({ databaseName, databaseVersion, objectStoreName }: IInitializeObjectStoreInstanceProps) =>
  async (type: IDBTransactionMode): Promise<IDBObjectStore> => {
    const database = await initializeDatabase({
      databaseName,
      databaseVersion,
      objectStoreName,
    });

    const transaction = database.transaction(objectStoreName, type);

    return transaction.objectStore(objectStoreName);
  };
