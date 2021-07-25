import { FileEntry, DirectoryEntry } from '@types';

export interface ReadDirectoryDecoratorProps {
  rootDirectoryName: string;

  openCursor: <TValue>(
    value: any,
    onResolve: (target: IDBRequest, resolve: (value: TValue) => void) => TValue,
  ) => Promise<TValue>;
  isDirectory: (fullPath: string) => Promise<boolean>;
}

export interface ReadDirectoryDecoratorOutput {
  isEmpty: boolean;
  filesCount: number;
  directoriesCount: number;
  directories: DirectoryEntry[];
  files: Omit<FileEntry, 'data'>[];
}
