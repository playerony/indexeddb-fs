import { EntryType, DirectoryEntry } from '@types';
import { CreateRootDirectoryDecoratorProps } from './create-root-directory-decorator.types';

export const createRootDirectoryDecorator =
  ({ putRecord, rootDirectoryName }: CreateRootDirectoryDecoratorProps) =>
  async (): Promise<DirectoryEntry | null> => {
    const entry: DirectoryEntry = {
      isRoot: true,
      createdAt: Date.now(),
      name: rootDirectoryName,
      type: EntryType.DIRECTORY,
      fullPath: rootDirectoryName,
      directory: rootDirectoryName,
    };

    return putRecord(entry);
  };
