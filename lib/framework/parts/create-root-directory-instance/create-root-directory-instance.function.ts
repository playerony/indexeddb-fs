import { EEntryType, IDirectoryEntry } from '@types';
import { ICreateRootDirectoryInstanceProps } from './create-root-directory-instance.types';

export const createRootDirectoryInstance =
  ({ putRecord, rootDirectoryName }: ICreateRootDirectoryInstanceProps) =>
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
