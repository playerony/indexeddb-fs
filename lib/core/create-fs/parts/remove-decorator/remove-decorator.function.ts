import { formatAndValidateFullPath } from '@core/utils';

import { RemoveDecoratorProps } from './remove-decorator.types';

export const removeDecorator =
  ({ exists, rootDirectoryName, initializeObjectStore }: RemoveDecoratorProps) =>
  async (fullPath: string): Promise<void> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const doesTargetExist = await exists(verifiedFullPath);
    if (!doesTargetExist) {
      throw new Error(`"${verifiedFullPath}" file or directory does not exist.`);
    }

    const objectStore = await initializeObjectStore('readwrite');

    return new Promise((resolve, reject) => {
      const request = objectStore.delete(verifiedFullPath);

      request.onerror = reject;
      request.onsuccess = () => resolve();
    });
  };
