import { IFileEntry } from '@types';

export interface ICopyFileInstanceProps {
  exists: (fullPath: string) => Promise<boolean>;
  fileDetails: <TData = unknown>(fullPath: string) => Promise<IFileEntry<TData>>;
  isDirectory: (fullPath: string) => Promise<boolean>;
  isFile: (fullPath: string) => Promise<boolean>;
  rootDirectoryName: string;
  writeFile: <TData = unknown>(fullPath: string, data: TData) => Promise<IFileEntry<TData>>;
}
