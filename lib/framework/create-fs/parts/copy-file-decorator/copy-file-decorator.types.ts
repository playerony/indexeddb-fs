import { FileEntry } from '@types';

export interface CopyFileDecoratorProps {
  rootDirectoryName: string;

  exists: (fullPath: string) => Promise<boolean>;
  isFile: (fullPath: string) => Promise<boolean>;
  isDirectory: (fullPath: string) => Promise<boolean>;
  fileDetails: <TData = any>(fullPath: string) => Promise<FileEntry<TData>>;
  writeFile: <TData = any>(fullPath: string, data: TData) => Promise<FileEntry<TData>>;
}
