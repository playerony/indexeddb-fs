import path from 'path';

import {
  isIndexedDBSupport,
  validateCreateFSProps,
  formatAndValidateFullPath,
  initializeObjectStoreDecorator,
} from '@core/utils';

import { CreateFSProps } from './create-fs.types';
import { FileEntry, DirectoryEntry } from '@types';

import { defaultProps } from './create-fs.defaults';
import { OBJECT_STORE_INDEX_NAME } from '@constants';

export function createFS({
  databaseName = defaultProps.databaseName,
  databaseVersion = defaultProps.databaseVersion,
  objectStoreName = defaultProps.objectStoreName,
  rootDirectoryName = defaultProps.rootDirectoryName,
}: CreateFSProps = defaultProps) {
  function initialize() {
    checkIndexedDBSupport();
    validateProps();
  }

  function checkIndexedDBSupport() {
    if (!isIndexedDBSupport()) {
      throw new Error('Your browser does not support indexedDB.');
    }
  }

  function validateProps() {
    validateCreateFSProps({
      databaseName,
      objectStoreName,
      databaseVersion,
      rootDirectoryName,
    });
  }

  const initializeObjectStore = initializeObjectStoreDecorator({
    databaseName,
    databaseVersion,
    objectStoreName,
  });

  async function exists(fullPath: string): Promise<boolean> {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const objectStore = await initializeObjectStore('readonly');
    const objectStoreIndex = objectStore.index(OBJECT_STORE_INDEX_NAME);

    const keyRange = IDBKeyRange.only(verifiedFullPath);
    const request = objectStoreIndex.openCursor(keyRange);

    return new Promise((resolve) => {
      request.onerror = () => resolve(false);
      request.onsuccess = (event: Event) => {
        const targetWithType = event.target as IDBRequest;
        const cursor = targetWithType.result as IDBCursorWithValue;

        resolve(Boolean(cursor?.value?.createdAt));
      };
    });
  }

  async function writeFile<TData = any>(fullPath: string, data: TData): Promise<void> {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const objectStore = await initializeObjectStore('readwrite');

    return new Promise((resolve, reject) => {
      const entry: FileEntry<TData> = {
        data,
        type: 'file',
        createdAt: Date.now(),
        fullPath: verifiedFullPath,
        name: path.basename(verifiedFullPath),
        directory: path.dirname(verifiedFullPath),
      };

      const request = objectStore.put(entry);

      request.onerror = reject;
      request.onsuccess = () => resolve();
    });
  }

  async function readFile<TData = any>(fullPath: string): Promise<FileEntry<TData>> {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const objectStore = await initializeObjectStore('readonly');

    return new Promise((resolve, reject) => {
      const request = objectStore.get(verifiedFullPath);

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

  async function removeFile(fullPath: string): Promise<void> {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const objectStore = await initializeObjectStore('readwrite');

    return new Promise((resolve, reject) => {
      const request = objectStore.delete(verifiedFullPath);

      request.onerror = reject;
      request.onsuccess = () => resolve();
    });
  }

  async function createDirectory(fullPath: string): Promise<DirectoryEntry> {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const objectStore = await initializeObjectStore('readwrite');

    return new Promise((resolve, reject) => {
      const entry: DirectoryEntry = {
        type: 'directory',
        createdAt: Date.now(),
        fullPath: verifiedFullPath,
        name: path.basename(verifiedFullPath),
        directory: path.dirname(verifiedFullPath),
      };

      const request = objectStore.put(entry);

      request.onerror = reject;
      request.onsuccess = () => resolve(entry);
    });
  }

  async function readDirectory(fullPath: string): Promise<any[]> {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const objectStore = await initializeObjectStore('readonly');

    return new Promise((resolve, reject) => {
      const objectStoreIndex = objectStore.index(OBJECT_STORE_INDEX_NAME);

      const keyRange = IDBKeyRange.only(verifiedFullPath);
      const request = objectStoreIndex.openCursor(keyRange);

      request.onerror = reject;

      const results: any[] = [];
      request.onsuccess = (event: Event) => {
        const targetWithType = event.target as IDBRequest;
        const cursor = targetWithType.result as IDBCursorWithValue;

        if (cursor) {
          const { value } = cursor;

          const entry = {
            type: value.type,
            createdAt: Date.now(),
            fullPath: verifiedFullPath,
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

  async function removeDirectory(fullPath: string) {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const files = await readDirectory(verifiedFullPath);

    if (!files || !files.length) {
      return null;
    }

    files.forEach(async (_file) => {
      await removeFile(`${_file.fullPath}/${_file.name}`);
    });

    return null;
  }

  initialize();

  return {
    exists,
    readFile,
    writeFile,
    removeFile,
    readDirectory,
    createDirectory,
    removeDirectory,
  };
}
