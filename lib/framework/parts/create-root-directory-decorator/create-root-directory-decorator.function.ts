import { EEntryType, IDirectoryEntry } from '@types';
import { ICreateRootDirectoryDecoratorProps } from './create-root-directory-decorator.types';

export const createRootDirectoryDecorator =
  ({ putRecord, rootDirectoryName }: ICreateRootDirectoryDecoratorProps) =>
  async (): Promise<IDirectoryEntry | null> => {
    const entry: IDirectoryEntry = {
      isRoot: true,
      createdAt: Date.now(),
      name: rootDirectoryName,
      type: EEntryType.DIRECTORY,
      fullPath: rootDirectoryName,
      directory: rootDirectoryName,
    };

    return putRecord(entry);
  };
