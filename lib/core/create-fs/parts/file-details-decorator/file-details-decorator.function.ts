import { formatAndValidateFullPath } from '@core/utils';

import { FileEntry, EntryType } from '@types';
import { FileDetailsDecoratorProps } from './file-details-decorator.types';

export const fileDetailsDecorator =
  ({ isFile, rootDirectoryName, initializeObjectStore }: FileDetailsDecoratorProps) =>
  async <TData = any>(fullPath: string): Promise<FileEntry<TData>> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const targetIsOfTypeFile = await isFile(verifiedFullPath);
    if (!targetIsOfTypeFile) {
      throw new Error(`"${verifiedFullPath}" is not a file.`);
    }

    const objectStore = await initializeObjectStore('readonly');

    return new Promise((resolve, reject) => {
      const request = objectStore.getAll(verifiedFullPath);

      request.onerror = reject;

      request.onsuccess = (event: Event) => {
        const { result } = event.target as IDBRequest;

        const foundFile = result.find(
          (_result: FileEntry<TData>) => _result.type === EntryType.FILE,
        );

        resolve(foundFile);
      };
    });
  };
