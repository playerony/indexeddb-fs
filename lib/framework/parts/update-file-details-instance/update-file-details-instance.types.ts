import { IFileEntry } from '@types';

export interface IUpdateFileDetailsInstanceProps {
  fileDetails: <TData = unknown>(fullPath: string) => Promise<IFileEntry<TData>>;
  isDirectory: (fullPath: string) => Promise<boolean>;
  putRecord: <TValue = unknown>(value: TValue, key?: IDBValidKey) => Promise<TValue>;
  rootDirectoryName: string;
}
