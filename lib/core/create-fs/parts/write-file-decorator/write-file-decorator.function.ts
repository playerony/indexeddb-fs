import path from 'path';

import { formatAndValidateFullPath } from '@core/utils';

import { FileEntry } from '@types';
import { WriteFileDecoratorProps } from './write-file-decorator.types';

export const writeFileDecorator =
  ({ exists, rootDirectoryName, initializeObjectStore }: WriteFileDecoratorProps) =>
  async <TData = any>(fullPath: string, data: TData): Promise<FileEntry<TData>> => {
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
      const entry: FileEntry<TData> = {
        data,
        directory,
        type: 'file',
        name: basename,
        createdAt: Date.now(),
        fullPath: verifiedFullPath,
      };

      const request = objectStore.put(entry);

      request.onerror = reject;
      request.onsuccess = () => resolve(entry);
    });
  };
