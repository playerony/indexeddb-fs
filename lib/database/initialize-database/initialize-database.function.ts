import { openIndexedDBConnection } from '@database';

import { IInitializeDatabaseProps } from './initialize-database.types';

import { OBJECT_STORE_INDEX_NAME, OBJECT_STORE_KEY_PATH } from '@constants';

function getDatabaseObjectFromTarget(target: EventTarget | null): IDBDatabase | null {
  if (!target) {
    return null;
  }

  const targetWithType = target as IDBOpenDBRequest;

  return targetWithType.result;
}

function throwDatabaseOpenError(reject: (reason: unknown) => void, database: IDBDatabase | null) {
  if (!database) {
    reject(new Error('Something went wrong and the database transaction was not opened.'));
  }
}

export const initializeDatabase = ({
  databaseName,
  databaseVersion,
  objectStoreName,
}: IInitializeDatabaseProps): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const request = openIndexedDBConnection(databaseName, databaseVersion);

    request.onerror = reject;

    request.onsuccess = ({ target }: Event) => {
      const database = getDatabaseObjectFromTarget(target);

      throwDatabaseOpenError(reject, database);

      resolve(database as IDBDatabase);
    };

    request.onupgradeneeded = ({ target }: IDBVersionChangeEvent) => {
      const database = getDatabaseObjectFromTarget(target);

      throwDatabaseOpenError(reject, database);

      const objectStore = database?.createObjectStore(objectStoreName, {
        keyPath: OBJECT_STORE_KEY_PATH,
      });

      objectStore?.createIndex(OBJECT_STORE_INDEX_NAME, OBJECT_STORE_INDEX_NAME, { unique: false });
    };
  });
