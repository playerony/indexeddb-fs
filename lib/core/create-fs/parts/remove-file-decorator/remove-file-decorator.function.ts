import { formatAndValidateFullPath } from '@core/utils';

import { RemoveFileDecoratorProps } from './remove-file-decorator.types';

export const removeFileDecorator =
  ({ exists, rootDirectoryName, initializeObjectStore }: RemoveFileDecoratorProps) =>
  async (fullPath: string): Promise<void> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const doesDirectoryExists = await exists(verifiedFullPath);

    if (!doesDirectoryExists) {
      throw new Error(`"${fullPath}" file does not exist.`);
    }

    const objectStore = await initializeObjectStore('readwrite');

    return new Promise((resolve, reject) => {
      const request = objectStore.delete(verifiedFullPath);

      request.onerror = reject;
      request.onsuccess = () => resolve();
    });
  };
