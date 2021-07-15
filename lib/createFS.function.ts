import path from 'path';

import { isIndexedDBSupport, initializeDatabase, withTrailingSlash } from './utils';

import { CreateFSProps } from './createFS.types';
import { FileEntry, DirectoryEntry } from './types';

import { OBJECT_STORE_INDEX_NAME } from './constants';

export function createFS({
  databaseName,
  databaseVersion = 10,
  objectStoreName = 'files',
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
      databaseName,
      databaseVersion,
      objectStoreName,
    });

    const transaction = database.transaction(objectStoreName, type);
    return transaction.objectStore(objectStoreName);
  };

  async function writeFile<TData = any>(filePath: string, data: TData): Promise<void> {
    const objectStore = await initializeObjectStore('readwrite');

    return new Promise((resolve, reject) => {
      const entry: FileEntry<TData> = {
        data,
        type: 'file',
        fullPath: filePath,
        createdAt: Date.now(),
        name: path.basename(filePath),
        directory: path.dirname(filePath),
      };

      const request = objectStore.put(entry);

      request.onerror = reject;
      request.onsuccess = () => resolve();
    });
  }

  async function readFile<TData = any>(filePath: string): Promise<FileEntry<TData>> {
    const objectStore = await initializeObjectStore('readonly');

    return new Promise((resolve, reject) => {
      const request = objectStore.get(filePath);

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

  async function createDirectory(fullPath: string): Promise<void> {
    const objectStore = await initializeObjectStore('readwrite');

    return new Promise((resolve, reject) => {
      const directory = withTrailingSlash(fullPath);

      const entry: DirectoryEntry = {
        fullPath,
        type: 'directory',
        createdAt: Date.now(),
        name: path.basename(directory),
        directory: path.dirname(directory),
      };

      const request = objectStore.put(entry);

      request.onerror = reject;
      request.onsuccess = () => resolve();
    });
  }

  async function readDirectory(fullPath: string): Promise<any[]> {
    const objectStore = await initializeObjectStore('readonly');

    return new Promise((resolve, reject) => {
      const directory = fullPath;

      const objectStoreIndex = objectStore.index(OBJECT_STORE_INDEX_NAME);

      const range = IDBKeyRange.only(directory);
      const request = objectStoreIndex.openCursor(range);

      request.onerror = reject;

      const results: any[] = [];
      request.onsuccess = (event: Event) => {
        const targetWithType = event.target as IDBRequest;
        const cursor = targetWithType.result as IDBCursorWithValue;

        if (cursor) {
          const { value } = cursor;

          const entry = {
            fullPath,
            type: value.type,
            createdAt: Date.now(),
            name: path.basename(value.fullPath),
            directory: path.dirname(value.fullPath),
          };

          results.push(entry);
          cursor.continue();
        } else {
          resolve(results.slice());
        }
      };
    });
  }

  initialize();

  return { readFile, writeFile, removeFile, readDirectory, createDirectory };
}
