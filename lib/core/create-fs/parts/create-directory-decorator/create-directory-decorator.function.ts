import path from 'path';

import { formatAndValidateFullPath } from '@core/utils';

import { EntryType, DirectoryEntry } from '@types';
import { CreateDirectoryDecoratorProps } from './create-directory-decorator.types';

export const createDirectoryDecorator =
  ({ isDirectory, rootDirectoryName, initializeObjectStore }: CreateDirectoryDecoratorProps) =>
  async (fullPath: string): Promise<DirectoryEntry> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);
    if (verifiedFullPath === rootDirectoryName) {
      throw new Error(`Root directory: "${verifiedFullPath}" already exist.`);
    }

    const basename = path.basename(verifiedFullPath);
    const directory = path.dirname(verifiedFullPath);

    const targetIsTypeOfDirectory = await isDirectory(directory);
    if (!targetIsTypeOfDirectory) {
      throw new Error(`"${directory}" is not a directory.`);
    }

    const objectStore = await initializeObjectStore('readwrite');

    return new Promise((resolve, reject) => {
      const entry: DirectoryEntry = {
        directory,
        isRoot: false,
        name: basename,
        createdAt: Date.now(),
        type: EntryType.DIRECTORY,
        fullPath: verifiedFullPath,
      };

      const request = objectStore.put(entry);

      request.onerror = reject;
      request.onsuccess = () => resolve(entry);
    });
  };
