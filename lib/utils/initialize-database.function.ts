import { openIndexedDBConnection } from '.';

import { CreateFSProps } from '../createFS.types';

export const initializeDatabase = ({
  storeName,
  databaseName,
  indexedDBVersion,
  rootDirectoryName,
}: CreateFSProps): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const req = openIndexedDBConnection(databaseName, indexedDBVersion);

    req.onupgradeneeded = ({ target }: IDBVersionChangeEvent) => {
      const targetWithType = target as IDBOpenDBRequest;
      const db = targetWithType.result;

      if (!db || !storeName || !rootDirectoryName) {
        reject(new Error('Something went wrong and the database transaction was not opened.'));
      }

      const stringStoreName = storeName || '';
      const stringRootDirectoryName = rootDirectoryName || '';

      const objectStore = db.createObjectStore(stringStoreName, { keyPath: 'path' });
      objectStore.createIndex(stringRootDirectoryName, 'dir', { unique: false });
    };

    req.onsuccess = ({ target }: Event) => {
      const targetWithType = target as IDBOpenDBRequest;

      resolve(targetWithType.result);
    };
  });
