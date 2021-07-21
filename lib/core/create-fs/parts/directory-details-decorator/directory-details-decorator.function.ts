import { formatAndValidateFullPath } from '@core/utils';

import { EntryType, DirectoryEntry } from '@types';
import { DirectoryDetailsDecoratorProps } from './directory-details-decorator.types';

export const directoryDetailsDecorator =
  ({ isDirectory, rootDirectoryName, initializeObjectStore }: DirectoryDetailsDecoratorProps) =>
  async (fullPath: string): Promise<DirectoryEntry> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const targetIsOfTypeDirectory = await isDirectory(fullPath);
    if (!targetIsOfTypeDirectory) {
      throw new Error(`"${verifiedFullPath}" is not a directory.`);
    }

    const objectStore = await initializeObjectStore('readonly');

    return new Promise((resolve, reject) => {
      const request = objectStore.getAll(verifiedFullPath);

      request.onerror = reject;

      request.onsuccess = (event: Event) => {
        const targetWithType = event.target as IDBRequest;

        const result = targetWithType.result.find(
          (_result: DirectoryEntry) => _result.type === EntryType.DIRECTORY,
        );

        resolve(result);
      };
    });
  };
