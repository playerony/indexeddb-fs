import { formatAndValidateFullPath } from '@core/utils';

import { FileEntry } from '@types';
import { ReadFileDecoratorProps } from './read-file-decorator.types';

export const readFileDecorator =
  ({ isFile, rootDirectoryName, initializeObjectStore }: ReadFileDecoratorProps) =>
  async <TData = any>(fullPath: string): Promise<FileEntry<TData>> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const targetIsOfTypeFile = await isFile(fullPath);
    if (!targetIsOfTypeFile) {
      throw new Error(`"${fullPath}" is not a file.`);
    }

    const objectStore = await initializeObjectStore('readonly');

    return new Promise((resolve, reject) => {
      const request = objectStore.get(verifiedFullPath);

      request.onerror = reject;

      request.onsuccess = (event: Event) => {
        const targetWithType = event.target as IDBRequest;
        const response = targetWithType.result;

        resolve(response?.data);
      };
    });
  };
