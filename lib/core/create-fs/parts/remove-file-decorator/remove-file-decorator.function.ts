import { formatAndValidateFullPath } from '@core/utils';

import { RemoveFileDecoratorProps } from './remove-file-decorator.types';

export const removeFileDecorator =
  ({ isFile, rootDirectoryName, initializeObjectStore }: RemoveFileDecoratorProps) =>
  async (fullPath: string): Promise<void> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const targetIsOfTypeFile = await isFile(fullPath);

    if (!targetIsOfTypeFile) {
      throw new Error(`"${fullPath}" is not a file.`);
    }

    const objectStore = await initializeObjectStore('readwrite');

    return new Promise((resolve, reject) => {
      const request = objectStore.delete(verifiedFullPath);

      request.onerror = reject;
      request.onsuccess = () => resolve();
    });
  };