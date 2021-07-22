import { FileEntry } from '@types';

export interface UpdateFileDetailsDecoratorProps {
  rootDirectoryName: string;

  isDirectory: (fullPath: string) => Promise<boolean>;
  fileDetails: <TData = any>(fullPath: string) => Promise<FileEntry<TData>>;
  initializeObjectStore: (type: IDBTransactionMode) => Promise<IDBObjectStore>;
}
