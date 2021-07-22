import { putDecorator } from '@database';

import { EntryType, DirectoryEntry } from '@types';
import { CreateRootDirectoryDecoratorProps } from './create-root-directory-decorator.types';

export const createRootDirectoryDecorator =
  ({ rootDirectoryName, initializeObjectStore }: CreateRootDirectoryDecoratorProps) =>
  async (): Promise<DirectoryEntry> => {
    const entry: DirectoryEntry = {
      isRoot: true,
      createdAt: Date.now(),
      name: rootDirectoryName,
      type: EntryType.DIRECTORY,
      fullPath: rootDirectoryName,
      directory: rootDirectoryName,
    };

    const put = putDecorator({ initializeObjectStore });

    return put(entry);
  };
