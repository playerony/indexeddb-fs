import { IFileEntry, IDirectoryEntry } from '@types';

export interface IReadDirectoryDecoratorProps {
  isDirectory: (fullPath: string) => Promise<boolean>;
  openCursor: <TValue>(
    value: unknown,
    onResolve: (target: IDBRequest, resolve: (value: TValue) => void) => TValue,
  ) => Promise<TValue>;
  rootDirectoryName: string;
}

export interface IReadDirectoryDecoratorOutput {
  directories: IDirectoryEntry[];
  directoriesCount: number;
  files: Omit<IFileEntry, 'data'>[];
  filesCount: number;
  isEmpty: boolean;
}
