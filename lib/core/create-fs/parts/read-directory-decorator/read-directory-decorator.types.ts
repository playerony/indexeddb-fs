import { FileEntry, DirectoryEntry } from '@types';

export interface ReadDirectoryDecoratorProps {
  rootDirectoryName: string;

  isDirectory: (fullPath: string) => Promise<boolean>;
  initializeObjectStore: (type: IDBTransactionMode) => Promise<IDBObjectStore>;
}

export interface ReadDirectoryDecoratorOutput {
  files: FileEntry[];
  directories: DirectoryEntry[];
}
