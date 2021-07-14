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

    const trans = db.transaction(storeName, type);
    return trans.objectStore(storeName);
  };

  async function writeFile<TData = any>(fileName: string, data: TData): Promise<void> {
    const objectStore = await initializeObjectStore('readwrite');

    return new Promise((resolve, reject) => {
      const req = objectStore.put({
        data,
        type: 'file',
        path: fileName,
        dir: path.dirname(fileName),
      });

      req.onerror = reject;
      req.onsuccess = () => resolve();
    });
  }

  initialize();

  return { writeFile };
}
