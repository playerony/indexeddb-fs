import { FileEntry, DirectoryEntry } from '@types';

export interface RemoveDirectoryDecoratorProps {
  rootDirectoryName: string;

  removeFile: (fullPath: string) => Promise<void>;
  readDirectory: (fullPath: string) => Promise<(FileEntry | DirectoryEntry)[]>;
  initializeObjectStore: (type: IDBTransactionMode) => Promise<IDBObjectStore>;
}
