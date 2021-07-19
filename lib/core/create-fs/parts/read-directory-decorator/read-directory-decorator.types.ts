import { FileEntry, DirectoryEntry } from '@types';

export interface ReadDirectoryDecoratorProps {
  rootDirectoryName: string;

  isDirectory: (fullPath: string) => Promise<boolean>;
  initializeObjectStore: (type: IDBTransactionMode) => Promise<IDBObjectStore>;
}

export interface ReadDirectoryDecoratorOutput {
  isEmpty: boolean;
  files: FileEntry[];
  filesCount: number;
  directoriesCount: number;
  directories: DirectoryEntry[];
}
