import { IFileEntry } from '@types';

export interface IRenameFileInstanceProps {
  exists: (fullPath: string) => Promise<boolean>;
  isFile: (fullPath: string) => Promise<boolean>;
  removeFile: (fullPath: string) => Promise<void>;
  rootDirectoryName: string;
  updateFileDetails: <TData = unknown>(
    fullPath: string,
    newFileEntry: Partial<IFileEntry<TData>>,
  ) => Promise<IFileEntry<TData>>;
}
