import { formatAndValidateFullPath } from '@core/utils';

import { EntryType } from '@types';
import { IsDirectoryDecoratorProps } from './is-directory-decorator.types';

export const isDirectoryDecorator =
  ({ exists, rootDirectoryName, initializeObjectStore }: IsDirectoryDecoratorProps) =>
  async (fullPath: string): Promise<boolean> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const doesDirectoryExists = await exists(verifiedFullPath);

    if (!doesDirectoryExists) {
      throw new Error(`"${fullPath}" directory does not exist.`);
    }

    const objectStore = await initializeObjectStore('readonly');

    return new Promise((resolve) => {
      const request = objectStore.get(verifiedFullPath);

      request.onerror = () => resolve(false);

      request.onsuccess = (event: Event) => {
        const targetWithType = event.target as IDBRequest;
        const response = targetWithType.result;

        resolve(Boolean(response?.type === EntryType.DIRECTORY));
      };
    });
  };
