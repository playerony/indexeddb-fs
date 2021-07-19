import { EntryType, DirectoryEntry } from '@types';
import { CreateRootDirectoryDecoratorProps } from './create-root-directory-decorator.types';

export const createRootDirectoryDecorator =
  ({ rootDirectoryName, initializeObjectStore }: CreateRootDirectoryDecoratorProps) =>
  async (): Promise<DirectoryEntry> => {
    const objectStore = await initializeObjectStore('readwrite');

    return new Promise((resolve, reject) => {
      const entry: DirectoryEntry = {
        isRoot: true,
        createdAt: Date.now(),
        name: rootDirectoryName,
        type: EntryType.DIRECTORY,
        fullPath: rootDirectoryName,
        directory: rootDirectoryName,
      };

      const request = objectStore.put(entry);

      request.onerror = reject;
      request.onsuccess = () => resolve(entry);
    });
  };
