import path from 'path';

import { formatAndValidateFullPath } from '@core/utils';

import { DirectoryEntry } from '@types';
import { CreateDirectoryDecoratorProps } from './create-directory-decorator.types';

export const createDirectoryDecorator =
  ({ exists, rootDirectoryName, initializeObjectStore }: CreateDirectoryDecoratorProps) =>
  async (fullPath: string): Promise<DirectoryEntry> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const basename = path.basename(verifiedFullPath);
    const directory = path.dirname(verifiedFullPath);

    const doesDirectoryExists = await exists(directory);
    const isRootDirectory = directory === rootDirectoryName;

    if (!isRootDirectory && !doesDirectoryExists) {
      throw new Error(`"${directory}" directory does not exist.`);
    }

    const objectStore = await initializeObjectStore('readwrite');

    return new Promise((resolve, reject) => {
      const entry: DirectoryEntry = {
        directory,
        name: basename,
        type: 'directory',
        createdAt: Date.now(),
        fullPath: verifiedFullPath,
      };

      const request = objectStore.put(entry);

      request.onerror = reject;
      request.onsuccess = () => resolve(entry);
    });
  };
