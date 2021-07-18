import { formatAndValidateFullPath } from '@core/utils';

import { RemoveDecoratorProps } from './remove-decorator.types';

export const removeDecorator =
  ({ exists, rootDirectoryName, initializeObjectStore }: RemoveDecoratorProps) =>
  async (fullPath: string): Promise<void> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const doesDirectoryExists = await exists(verifiedFullPath);

    if (!doesDirectoryExists) {
      throw new Error(`"${fullPath}" file or directory does not exist.`);
    }

    const objectStore = await initializeObjectStore('readwrite');

    return new Promise((resolve, reject) => {
      const request = objectStore.delete(verifiedFullPath);

      request.onerror = reject;
      request.onsuccess = () => resolve();
    });
  };
