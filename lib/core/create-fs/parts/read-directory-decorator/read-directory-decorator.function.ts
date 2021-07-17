import { formatAndValidateFullPath } from '@core/utils';

import { FileEntry, DirectoryEntry } from '@types';
import { ReatDirectoryDecoratorProps } from './read-directory-decorator.types';

import { OBJECT_STORE_INDEX_NAME } from '@constants';

export const readDirectoryDecorator =
  ({ exists, rootDirectoryName, initializeObjectStore }: ReatDirectoryDecoratorProps) =>
  async (fullPath: string): Promise<(FileEntry | DirectoryEntry)[]> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const doesDirectoryExists = await exists(verifiedFullPath);

    if (!doesDirectoryExists) {
      throw new Error(`"${fullPath}" directory does not exist.`);
    }

    const objectStore = await initializeObjectStore('readonly');

    return new Promise((resolve, reject) => {
      const objectStoreIndex = objectStore.index(OBJECT_STORE_INDEX_NAME);

      const keyRange = IDBKeyRange.only(verifiedFullPath);
      const request = objectStoreIndex.openCursor(keyRange);

      request.onerror = reject;

      const results: (FileEntry | DirectoryEntry)[] = [];
      request.onsuccess = (event: Event) => {
        const targetWithType = event.target as IDBRequest;
        const cursor = targetWithType.result as IDBCursorWithValue;

        if (cursor) {
          results.push(cursor.value);

          cursor.continue();
        } else {
          resolve(results);
        }
      };
    });
  };
