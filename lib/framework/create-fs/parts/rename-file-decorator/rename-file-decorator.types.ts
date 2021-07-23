import { FileEntry } from '@types';

export interface RenameFileDecoratorProps {
  rootDirectoryName: string;

  updateFileDetails: <TData = any>(
    fullPath: string,
    newFileEntry: Partial<FileEntry<TData>>,
  ) => Promise<FileEntry<TData>>;
  exists: (fullPath: string) => Promise<boolean>;
  isFile: (fullPath: string) => Promise<boolean>;
  removeFile: (fullPath: string) => Promise<void>;
}
