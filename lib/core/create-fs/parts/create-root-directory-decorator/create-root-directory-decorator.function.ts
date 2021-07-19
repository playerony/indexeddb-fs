import { formatAndValidateFullPath } from '@core/utils';

import { EntryType, DirectoryEntry } from '@types';
import { CreateRootDirectoryDecoratorProps } from './create-root-directory-decorator.types';

export const createRootDirectoryDecorator =
  ({ rootDirectoryName, initializeObjectStore }: CreateRootDirectoryDecoratorProps) =>
  async (fullPath: string): Promise<DirectoryEntry> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const objectStore = await initializeObjectStore('readwrite');

    return new Promise((resolve, reject) => {
      const entry: DirectoryEntry = {
        createdAt: Date.now(),
        name: rootDirectoryName,
        type: EntryType.DIRECTORY,
        fullPath: verifiedFullPath,
        directory: rootDirectoryName,
      };

      const request = objectStore.put(entry);

      request.onerror = reject;
      request.onsuccess = () => resolve(entry);
    });
  };
