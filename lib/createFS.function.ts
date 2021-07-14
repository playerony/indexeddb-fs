import path from 'path';

import { isIndexedDBSupport, initializeDatabase } from './utils';

import { CreateFSProps } from './createFS.types';

export function createFS({
  databaseName,
  indexedDBVersion,
  storeName = 'files',
  rootDirectoryName = 'root',
}: CreateFSProps) {
  function initialize() {
    checkIndexedDBSupport();
  }

  function checkIndexedDBSupport() {
    if (!isIndexedDBSupport()) {
      throw new Error('Your browser does not support indexedDB.');
    }
  }

  const initializeObjectStore = async (type: IDBTransactionMode): Promise<IDBObjectStore> => {
    const db = await initializeDatabase({
      storeName,
      databaseName,
      indexedDBVersion,
      rootDirectoryName,
    });

    const transaction = db.transaction(storeName, type);
    return transaction.objectStore(storeName);
  };

  async function writeFile<TData = any>(fileName: string, data: TData): Promise<void> {
    const objectStore = await initializeObjectStore('readwrite');

    return new Promise((resolve, reject) => {
      const request = objectStore.put({
        data,
        type: 'file',
        path: fileName,
        dir: path.dirname(fileName),
      });

      request.onerror = reject;
      request.onsuccess = () => resolve();
    });
  }

  initialize();

  return { writeFile };
}
