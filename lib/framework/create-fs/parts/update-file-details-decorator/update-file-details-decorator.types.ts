import { FileEntry } from '@types';

export interface UpdateFileDetailsDecoratorProps {
  rootDirectoryName: string;

  isDirectory: (fullPath: string) => Promise<boolean>;
  fileDetails: <TData = any>(fullPath: string) => Promise<FileEntry<TData>>;
  putRecord: <TValue = any>(value: TValue, key?: IDBValidKey) => Promise<TValue>;
}
