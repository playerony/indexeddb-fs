import { formatAndValidateFullPath } from '@core/utils';

import {
  ReadDirectoryDecoratorProps,
  ReadDirectoryDecoratorOutput,
} from './read-directory-decorator.types';
import { FileEntry, EntryType, DirectoryEntry } from '@types';

import { OBJECT_STORE_INDEX_NAME } from '@constants';

export const readDirectoryDecorator =
  ({ isDirectory, rootDirectoryName, initializeObjectStore }: ReadDirectoryDecoratorProps) =>
  async (fullPath: string): Promise<ReadDirectoryDecoratorOutput> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const targetIsOfTypeDirectory = await isDirectory(fullPath);
    if (!targetIsOfTypeDirectory) {
      throw new Error(`"${fullPath}" is not a directory.`);
    }

    const objectStore = await initializeObjectStore('readonly');

    return new Promise((resolve, reject) => {
      const objectStoreIndex = objectStore.index(OBJECT_STORE_INDEX_NAME);

      const keyRange = IDBKeyRange.only(verifiedFullPath);
      const request = objectStoreIndex.openCursor(keyRange);

      request.onerror = reject;

      const foundFiles: FileEntry[] = [];
      const foundDirectories: DirectoryEntry[] = [];
      request.onsuccess = (event: Event) => {
        const targetWithType = event.target as IDBRequest;
        const cursor = targetWithType.result as IDBCursorWithValue;

        if (cursor) {
          const { value } = cursor;

          if (value.type === EntryType.FILE) {
            foundFiles.push(value);
          } else {
            foundDirectories.push(value);
          }

          cursor.continue();
        } else {
          const filesCount = foundFiles.length;
          const directoriesCount = foundDirectories.length;
          const isEmpty = filesCount === 0 && directoriesCount === 0;

          resolve({
            isEmpty,
            filesCount,
            directoriesCount,
            files: foundFiles,
            directories: foundDirectories,
          });
        }
      };
    });
  };
