import path from 'path';

import { isIndexedDBSupport, initializeDatabase } from './utils';

import { FileEntry } from './types';
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
    const database = await initializeDatabase({
      storeName,
      databaseName,
      indexedDBVersion,
      rootDirectoryName,
    });

    const transaction = database.transaction(storeName, type);
    return transaction.objectStore(storeName);
  };

  async function writeFile<TData = any>(filePath: string, data: TData): Promise<void> {
    const objectStore = await initializeObjectStore('readwrite');

    return new Promise((resolve, reject) => {
      const entry: FileEntry<TData> = {
        data,
        type: 'file',
        path: filePath,
        createdAt: Date.now(),
        dir: path.dirname(filePath),
      };

      const request = objectStore.put(entry);

      request.onerror = reject;
      request.onsuccess = () => resolve();
    });
  }

  async function readFile<TData = any>(fileName: string): Promise<FileEntry<TData>> {
    const objectStore = await initializeObjectStore('readonly');

    return new Promise((resolve, reject) => {
      const request = objectStore.get(fileName);

      request.onerror = reject;

      request.onsuccess = (event: Event) => {
        const targetWithType = event.target as IDBRequest;
        const response = targetWithType.result;

        if (response?.data) {
          resolve(response?.data);
        } else {
          reject(new Error('File not found.'));
        }
      };
    });
  }

  async function removeFile(filePath: string): Promise<void> {
    const objectStore = await initializeObjectStore('readwrite');

    return new Promise((resolve, reject) => {
      const request = objectStore.delete(filePath);

      request.onerror = reject;
      request.onsuccess = () => resolve();
    });
  }

  initialize();

  return { readFile, writeFile, removeFile };
}
