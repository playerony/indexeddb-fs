import { openIndexedDBConnection } from '.';

import { CreateFSProps } from '../../createFS.types';

import { OBJECT_STORE_INDEX_NAME, OBJECT_STORE_KEY_PATH } from '../../constants';

function getDatabaseObjectFromTarget(target: EventTarget | null): IDBDatabase | null {
  if (!target) {
    return null;
  }

  const targetWithType = target as IDBOpenDBRequest;

  return targetWithType.result;
}

function throwDatabaseOpenError(reject: (reason: any) => void, database: IDBDatabase | null) {
  if (!database) {
    reject(new Error('Something went wrong and the database transaction was not opened.'));
  }
}

export const initializeDatabase = ({
  databaseName,
  databaseVersion,
  objectStoreName,
}: Required<CreateFSProps>): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const req = openIndexedDBConnection(databaseName, databaseVersion);

    req.onupgradeneeded = ({ target }: IDBVersionChangeEvent) => {
      const database = getDatabaseObjectFromTarget(target) as any;

      throwDatabaseOpenError(reject, database);

      const objectStore = database.createObjectStore(objectStoreName, {
        keyPath: OBJECT_STORE_KEY_PATH,
      });

      objectStore.createIndex(OBJECT_STORE_INDEX_NAME, OBJECT_STORE_INDEX_NAME, { unique: false });
    };

    req.onsuccess = ({ target }: Event) => {
      const database = getDatabaseObjectFromTarget(target);

      throwDatabaseOpenError(reject, database);

      resolve(getDatabaseObjectFromTarget(target) as IDBDatabase);
    };

    req.onerror = reject;
  });
