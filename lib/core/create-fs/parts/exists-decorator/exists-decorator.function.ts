import { formatAndValidateFullPath } from '@core/utils';

import { ExistsDecoratorProps } from './exists-decorator.types';

export const existsDecorator =
  ({ rootDirectoryName, initializeObjectStore }: ExistsDecoratorProps) =>
  async (fullPath: string): Promise<boolean> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const objectStore = await initializeObjectStore('readonly');

    return new Promise((resolve) => {
      const request = objectStore.get(verifiedFullPath);

      request.onerror = () => resolve(false);

      request.onsuccess = (event: Event) => {
        const { result } = event.target as IDBRequest;

        resolve(Boolean(result?.createdAt));
      };
    });
  };
